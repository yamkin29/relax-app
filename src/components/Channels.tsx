'use client'
import React from 'react';
import Image from 'next/image';

interface Channel {
    id: string;
    name: string;
    videoCount: number;
    youtubeUrl: string;
    profileImage: string;
    popularVideos: {
        id: string;
        title: string;
        thumbnail: string;
    }[];
}

const Channels: React.FC = () => {
    // This would be replaced with actual data from your backend
    const channels: Channel[] = [
        {
            id: '1',
            name: 'Ambient Channel 1',
            videoCount: 150,
            youtubeUrl: 'https://youtube.com/channel/1',
            profileImage: '/channel1.jpg',
            popularVideos: [
                {
                    id: 'v1',
                    title: 'Relaxing Ambient Mix',
                    thumbnail: '/video1.jpg'
                },
                {
                    id: 'v2',
                    title: 'Calm Nature Sounds',
                    thumbnail: '/video2.jpg'
                }
            ]
        },
        // Add more channels as needed
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-white mb-8">Ambient Content Creators</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {channels.map((channel) => (
                    <div key={channel.id} className="bg-teal-900/50 rounded-lg p-6 backdrop-blur-sm">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                <Image
                                    src={channel.profileImage}
                                    alt={channel.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold text-white">{channel.name}</h2>
                                <p className="text-teal-200">{channel.videoCount} videos</p>
                            </div>
                        </div>
                        
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
                                    <div key={video.id} className="relative aspect-video rounded-lg overflow-hidden">
                                        <Image
                                            src={video.thumbnail}
                                            alt={video.title}
                                            fill
                                            className="object-cover"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                                            <p className="text-sm text-white truncate">{video.title}</p>
                                        </div>
                                    </div>
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