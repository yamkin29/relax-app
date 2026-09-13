'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { getChannelInfo, getPopularVideos } from '@/services/youtube';
import rawChannels from '@/data/channels.json';
import { cacheUtils } from '@/utils/cache';
import { formatLastUpdated, formatTimeUntilExpiry } from '@/lib/format';
import VideoModal from '@/components/video-modal/VideoModal';
import ChannelCard from './ChannelCard';
import { Channel, RawChannel } from './types';

const EMPTY_CHANNEL_STATE = { videoCount: 0, profileImage: '', popularVideos: [] };

const fetchChannel = async (channel: RawChannel): Promise<Channel> => {
    const [channelInfo, popularVideos] = await Promise.all([getChannelInfo(channel.channelId), getPopularVideos(channel.channelId)]);

    return {
        ...channel,
        failed: false,
        channelInfo,
        profileImage: channelInfo.thumbnails?.high?.url || '/default-channel.jpg',
        videoCount: parseInt(channelInfo.statistics?.videoCount || '0'),
        popularVideos,
    };
};

interface LoadResult {
    channels: Channel[];
    fromCache: boolean;
    updatedAt: number;
}

// Чистый лоадер без setState: компонент сам решает, когда обновлять состояние.
const loadChannels = async (): Promise<LoadResult> => {
    const cachedData = cacheUtils.get<Channel[]>(cacheUtils.keys.CHANNELS);

    if (cachedData) {
        // записи из старого кэша без данных канала помечаем как сбойные — для них будет retry
        return {
            channels: cachedData.data.map((channel) => ({ ...channel, failed: !channel.channelInfo })),
            fromCache: true,
            updatedAt: cachedData.timestamp,
        };
    }

    const channels = await Promise.all(
        (rawChannels as RawChannel[]).map(async (channel) => {
            try {
                return await fetchChannel(channel);
            } catch (error) {
                console.error(`Error processing channel ${channel.name}:`, error);
                return { ...channel, failed: true, ...EMPTY_CHANNEL_STATE };
            }
        }),
    );

    cacheUtils.set(cacheUtils.keys.CHANNELS, channels);
    return { channels, fromCache: false, updatedAt: Date.now() };
};

const ChannelsGrid: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);

    const load = useCallback(async () => {
        try {
            const result = await loadChannels();
            setChannels(result.channels);
            setLastUpdated(result.updatedAt);
            setIsFromCache(result.fromCache);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching channel data:', error);
            setFailed(true);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let ignore = false;
        void (async () => {
            try {
                const result = await loadChannels();
                if (!ignore) {
                    setChannels(result.channels);
                    setLastUpdated(result.updatedAt);
                    setIsFromCache(result.fromCache);
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching channel data:', error);
                if (!ignore) {
                    setFailed(true);
                    setLoading(false);
                }
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

    const retryAll = async () => {
        setLoading(true);
        setFailed(false);
        await load();
    };

    const retryChannel = async (retryTarget: Channel) => {
        // channelId берём из данных, а не из состояния: если id починили в channels.json,
        // retry должен подхватить исправление, не дожидаясь истечения localStorage-кэша
        const raw = (rawChannels as RawChannel[]).find((channel) => channel.id === retryTarget.id);
        if (!raw) return;

        try {
            const updated = await fetchChannel(raw);
            const next = channels.map((channel) => (channel.channelId === retryTarget.channelId ? updated : channel));
            setChannels(next);
            cacheUtils.set(cacheUtils.keys.CHANNELS, next);
        } catch (error) {
            console.error(`Retry failed for channel ${retryTarget.name}:`, error);
        }
    };

    if (loading) {
        return <div className="text-[var(--ink)] text-center">Loading channels...</div>;
    }

    if (failed) {
        return (
            <div className="text-center">
                <p className="text-[var(--ink)] mb-4">Something went wrong while loading channels.</p>
                <button
                    type="button"
                    onClick={() => void retryAll()}
                    className="px-4 py-2 bg-[var(--selected)] text-[var(--ink)] rounded-lg hover:bg-neutral-700 transition-colors"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-[var(--ink)]">Ambient Content Creators</h2>
                {lastUpdated && (
                    <div className="text-right">
                        <p className="text-[var(--accent)] text-sm">Last updated: {formatLastUpdated(lastUpdated)}</p>
                        {isFromCache && (
                            <p className="text-[var(--muted)] text-xs">Data will refresh in: {formatTimeUntilExpiry(lastUpdated)}</p>
                        )}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) =>
                    channel.failed ? (
                        <div
                            key={channel.id}
                            className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-6 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-3"
                        >
                            <p className="text-[var(--ink)] font-semibold">{channel.name}</p>
                            <p className="text-[var(--muted)] text-sm">Failed to load channel data.</p>
                            <button
                                type="button"
                                onClick={() => void retryChannel(channel)}
                                className="px-4 py-2 bg-[var(--selected)] text-[var(--ink)] rounded-lg hover:bg-neutral-700 transition-colors"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <ChannelCard key={channel.id} channel={channel} onPlayVideo={setSelectedVideo} />
                    ),
                )}
            </div>
            {selectedVideo && <VideoModal videoId={selectedVideo} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />}
        </>
    );
};

export default ChannelsGrid;
