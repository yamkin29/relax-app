'use client'
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { getChannelInfo, getChannelIdByUsername, getPopularVideos } from '@/services/youtube';
import { ChannelInfo, PopularVideo } from "@/types/youtube";

interface Channel {
    id: string;
    name: string;
    videoCount: number;
    youtubeUrl: string;
    channelId: string;
    profileImage: string;
    channelInfo?: ChannelInfo;
    popularVideos: PopularVideo[];
}

const getUsernameFromUrl = (url: string): string | null => {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        
        if (url.includes('@')) {
            return pathParts[1].replace('@', '');
        }
        
        return null;
    } catch (error) {
        console.error('Invalid YouTube URL:', url);
        return null;
    }
};

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
        day: 'numeric'
    });
};

const Channels: React.FC = () => {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                const channelsData: Channel[] = [
                    {
                        id: '1',
                        name: 'Relaxing White Noise',
                        videoCount: 280,
                        youtubeUrl: 'https://youtube.com/@RelaxingWhiteNoise',
                        channelId: '',
                        profileImage: '',
                        popularVideos: []
                    },
                    {
                        id: '2',
                        name: 'Relaxing White Noise',
                        videoCount: 280,
                        youtubeUrl: 'https://youtube.com/@RelaxingWhiteNoise',
                        channelId: '',
                        profileImage: '',
                        popularVideos: []
                    }
                ];

                // Fetch channel information for each channel
                const updatedChannels = await Promise.all(
                    channelsData.map(async (channel) => {
                        const username = getUsernameFromUrl(channel.youtubeUrl);
                        console.log(`Processing channel ${channel.name}:`, {
                            url: channel.youtubeUrl,
                            extractedUsername: username
                        });

                        if (!username) {
                            console.log(`No username found for channel ${channel.name}`);
                            return channel;
                        }

                        const channelId = await getChannelIdByUsername(username);
                        console.log(`Channel ID for ${channel.name}:`, channelId);

                        if (!channelId) {
                            console.log(`No channel ID found for ${channel.name}`);
                            return channel;
                        }

                        const [channelInfo, popularVideos] = await Promise.all([
                            getChannelInfo(channelId),
                            getPopularVideos(channelId)
                        ]);

                        console.log(`Channel info for ${channel.name}:`, channelInfo);
                        console.log(`Popular videos for ${channel.name}:`, popularVideos);

                        if (!channelInfo) {
                            console.log(`No channel info found for ${channel.name}`);
                            return channel;
                        }

                        return {
                            ...channel,
                            channelId,
                            channelInfo,
                            profileImage: channelInfo.thumbnails?.high?.url || '/default-channel.jpg',
                            videoCount: parseInt(channelInfo.statistics?.videoCount || '0'),
                            popularVideos
                        };
                    })
                );

                setChannels(updatedChannels);
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
            <h1 className="text-3xl font-bold text-white mb-8">Ambient Content Creators</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                    <div key={channel.id} className="bg-teal-900/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={channel.profileImage || '/default-channel.jpg'}
                                    alt={channel.name}
                                    fill
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
                            <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                {channel.channelInfo.description}
                            </p>
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
                                    <a
                                        key={video.id}
                                        href={`https://www.youtube.com/watch?v=${video.id}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group"
                                    >
                                        <div className="relative aspect-video rounded-lg overflow-hidden">
                                            <Image
                                                src={video.thumbnail}
                                                alt={video.title}
                                                fill
                                                className="object-cover transition-transform group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <svg
                                                    className="w-12 h-12 text-white"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8 5v14l11-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="mt-2">
                                            <h4 className="text-sm font-medium text-white line-clamp-2">
                                                {video.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-gray-400">
                                                    {formatViewCount(video.viewCount)}
                                                </span>
                                                <span className="text-xs text-gray-400">
                                                    {formatDate(video.publishedAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channels; 