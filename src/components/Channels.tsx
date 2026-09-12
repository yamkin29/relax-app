'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getChannelInfo, getPopularVideos } from '@/services/youtube';
import { ChannelInfo, PopularVideo } from '@/types/youtube';
import rawChannels from '@/data/channels.json';
import VideoModal from './VideoModal';
import { cacheUtils } from '@/utils/cache';
import { STYLES } from '@/components/videoCard/constants/videoCard';

interface RawChannel {
    id: string;
    name: string;
    channelId: string;
    youtubeUrl: string;
}

interface Channel extends RawChannel {
    videoCount: number;
    profileImage: string;
    channelInfo?: ChannelInfo;
    popularVideos: PopularVideo[];
}

const EMPTY_CHANNEL_STATE = { videoCount: 0, profileImage: '', popularVideos: [] as PopularVideo[] };

const formatViewCount = (count: string): string => {
    const num = parseInt(count);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M views`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

const formatLastUpdated = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const formatTimeUntilExpiry = (timestamp: number): string => {
    const expiryTime = timestamp + 24 * 60 * 60 * 1000; // 24 hours from timestamp
    const now = Date.now();
    const timeLeft = expiryTime - now;

    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}h ${minutes}m`;
};

const Channels: React.FC = () => {
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

                const channelsData = rawChannels as RawChannel[];

                const updatedChannels = await Promise.all(
                    channelsData.map(async (channel): Promise<Channel> => {
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

                const currentTime = Date.now();
                cacheUtils.set(cacheUtils.keys.CHANNELS, updatedChannels);
                setChannels(updatedChannels);
                setLastUpdated(currentTime);
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
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="text-white text-center">Loading channels...</div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Ambient Content Creators</h1>
                {lastUpdated && (
                    <div className="text-right">
                        <p className="text-teal-300 text-sm">Last updated: {formatLastUpdated(lastUpdated)}</p>
                        {isFromCache && <p className="text-teal-200 text-xs">Data will refresh in: {formatTimeUntilExpiry(lastUpdated)}</p>}
                    </div>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                    <div key={channel.id} className="bg-teal-900/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={channel.profileImage || '/default-channel.jpg'}
                                    alt={channel.name}
                                    fill
                                    sizes="64px"
                                    className="object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/default-channel.jpg';
                                    }}
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">{channel.name}</h2>
                                <p className="text-teal-200">{channel.videoCount} videos</p>
                                {channel.channelInfo && channel.channelInfo.statistics?.subscriberCount && (
                                    <p className="text-teal-300 text-sm">
                                        {parseInt(channel.channelInfo.statistics.subscriberCount).toLocaleString()} subscribers
                                    </p>
                                )}
                            </div>
                        </div>

                        {channel.channelInfo && (
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">{channel.channelInfo.description}</p>
                        )}

                        <a
                            href={channel.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block mb-4 text-teal-300 hover:text-teal-200 transition-colors"
                        >
                            Visit YouTube Channel
                        </a>

                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-white mb-3">Popular Videos</h3>
                            <div className="grid grid-cols-2 gap-3">
                                {channel.popularVideos.map((video) => (
                                    <div key={video.id}>
                                        <button
                                            type="button"
                                            onClick={() => setSelectedVideo(video.id)}
                                            aria-label={`Play ${video.title}`}
                                            className="group block w-full cursor-pointer text-left"
                                        >
                                            <span className="relative block aspect-video rounded-lg overflow-hidden">
                                                <Image
                                                    src={video.thumbnail}
                                                    alt=""
                                                    fill
                                                    sizes="(max-width: 768px) 45vw, 220px"
                                                    className="object-cover transition-transform group-hover:scale-105"
                                                />
                                                <span className={STYLES.card.overlay}>
                                                    <span className={STYLES.card.playButton.container}>
                                                        <svg
                                                            className={STYLES.card.playButton.icon}
                                                            fill="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M8 5v14l11-7z" />
                                                        </svg>
                                                    </span>
                                                </span>
                                            </span>
                                        </button>
                                        <div className="mt-2">
                                            <h4 className="text-sm font-medium text-white line-clamp-2">{video.title}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400">{formatViewCount(video.viewCount)}</span>
                                                <span className="text-xs text-gray-400">{formatDate(video.publishedAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {selectedVideo && <VideoModal videoId={selectedVideo} isOpen={!!selectedVideo} onClose={() => setSelectedVideo(null)} />}
        </div>
    );
};

export default Channels;
