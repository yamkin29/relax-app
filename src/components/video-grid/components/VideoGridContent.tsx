import VideoCard from '../../video-card/VideoCard';
import { Video } from '@/components/video-grid/types/video';

interface VideoGridContentProps {
    videos: Video[];
}

const VideoGridContent = ({ videos }: VideoGridContentProps) => {
    return (
        <div className="video-library">
            <div className="library-heading" aria-live="polite">
                <h2>Your next quiet moment</h2>
                <span>
                    {videos.length} video{videos.length !== 1 ? 's' : ''}
                </span>
            </div>

            <div className="video-grid">
                {videos.map((video) => (
                    <VideoCard key={video.youtubeId} thumbnail={video.thumbnail} link={video.link} title={video.title} />
                ))}
            </div>

            {videos.length === 0 && <div className="empty-state">No videos found matching your criteria</div>}
        </div>
    );
};

export default VideoGridContent;
