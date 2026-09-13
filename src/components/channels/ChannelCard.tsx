import Image from 'next/image';
import { formatDate, formatViewCount } from '@/lib/format';
import { STYLES } from '@/components/video-card/constants/video-card';
import { Channel } from './types';

interface ChannelCardProps {
    channel: Channel;
    onPlayVideo: (videoId: string) => void;
}

const ChannelCard = ({ channel, onPlayVideo }: ChannelCardProps) => {
    return (
        <div className="bg-[var(--surface)] border border-[var(--line)] rounded-lg p-6 backdrop-blur-sm">
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
                    <h2 className="text-xl font-semibold text-[var(--ink)]">{channel.name}</h2>
                    <p className="text-[var(--muted)]">{channel.videoCount} videos</p>
                    {channel.channelInfo && channel.channelInfo.statistics?.subscriberCount && (
                        <p className="text-[var(--accent)] text-sm">
                            {parseInt(channel.channelInfo.statistics.subscriberCount).toLocaleString()} subscribers
                        </p>
                    )}
                </div>
            </div>

            {channel.channelInfo && <p className="text-[var(--muted)] text-sm mb-4 line-clamp-2">{channel.channelInfo.description}</p>}

            <a
                href={channel.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mb-4 text-[var(--accent)] hover:text-[var(--muted)] transition-colors"
            >
                Visit YouTube Channel
            </a>

            <div className="mt-4">
                <h3 className="text-lg font-semibold text-[var(--ink)] mb-3">Popular Videos</h3>
                <div className="grid grid-cols-2 gap-3">
                    {channel.popularVideos.map((video) => (
                        <div key={video.id}>
                            <button
                                type="button"
                                onClick={() => onPlayVideo(video.id)}
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
                                            <svg className={STYLES.card.playButton.icon} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                            </button>
                            <div className="mt-2">
                                <h4 className="text-sm font-medium text-[var(--ink)] line-clamp-2">{video.title}</h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-[var(--muted)]">{formatViewCount(video.viewCount)}</span>
                                    <span className="text-xs text-[var(--muted)]">{formatDate(video.publishedAt)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ChannelCard;
