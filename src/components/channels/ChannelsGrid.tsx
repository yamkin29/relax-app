'use client';
import React, { useEffect, useState } from 'react';
import { getChannelInfo, getPopularVideos } from '@/services/youtube';
import rawChannels from '@/data/channels.json';
import { cacheUtils } from '@/utils/cache';
import { formatLastUpdated, formatTimeUntilExpiry } from '@/lib/format';
import VideoModal from '@/components/video-modal/VideoModal';
import ChannelCard from './ChannelCard';
import { Channel, RawChannel } from './types';

const EMPTY_CHANNEL_STATE = { videoCount: 0, profileImage: '', popularVideos: [] };

const ChannelsGrid: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [lastUpdated, setLastUpdated] = useState<number | null>(null);
    const [isFromCache, setIsFromCache] = useState(false);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const cachedData = cacheUtils.get<Channel[]>(cacheUtils.keys.CHANNELS);

                if (cachedData) {
                    setChannels(cachedData.data);
                    setLastUpdated(cachedData.timestamp);
                    setIsFromCache(true);
                    setLoading(false);
                    return;
                }

                const updatedChannels = await Promise.all(
                    (rawChannels as RawChannel[]).map(async (channel): Promise<Channel> => {
                        try {
                            const [channelInfo, popularVideos] = await Promise.all([
                                getChannelInfo(channel.channelId),
                                getPopularVideos(channel.channelId),
                            ]);

                            if (!channelInfo) {
                                return { ...channel, ...EMPTY_CHANNEL_STATE };
                            }

                            return {
                                ...channel,
                                channelInfo,
                                profileImage: channelInfo.thumbnails?.high?.url || '/default-channel.jpg',
                                videoCount: parseInt(channelInfo.statistics?.videoCount || '0'),
                                popularVideos,
                            };
                        } catch (error) {
                            console.error(`Error processing channel ${channel.name}:`, error);
                            return { ...channel, ...EMPTY_CHANNEL_STATE };
                        }
                    }),
                );

                cacheUtils.set(cacheUtils.keys.CHANNELS, updatedChannels);
                setChannels(updatedChannels);
                setLastUpdated(Date.now());
                setIsFromCache(false);
            } catch (error) {
                console.error('Error fetching channel data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChannelData();
    }, []);

    if (loading) {
        return <div className="text-white text-center">Loading channels...</div>;
    }

    return (
        <>
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold text-white">Ambient Content Creators</h2>
                {lastUpdated && (
                    <div className="text-right">
                        <p className="text-teal-300 text-sm">Last updated: {formatLastUpdated(lastUpdated)}</p>
                        {isFromCache && <p className="text-teal-200 text-xs">Data will refresh in: {formatTimeUntilExpiry(lastUpdated)}</p>}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                    <ChannelCard key={channel.id} channel={channel} onPlayVideo={setSelectedVideo} />
                ))}
            </div>
            {selectedVideo && <VideoModal videoId={selectedVideo} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />}
        </>
    );
};

export default ChannelsGrid;
