import VideoCard from '../../videoCard/VideoCard';
import { Video } from '@/components/videoGrid/types/video';

interface VideoGridContentProps {
    videos: Video[];
}

const VideoGridContent = ({ videos }: VideoGridContentProps) => {
    return (
        <div className="container mx-auto">
            <div className="mb-4 text-teal-100">
                Found {videos.length} video{videos.length !== 1 ? 's' : ''}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {videos.map((video, index) => (
                    <VideoCard
                        key={index}
                        thumbnail={video.thumbnail}
                        link={video.link}
                        rutubeLink={video.rutubeLink}
                        title={video.title}
                    />
                ))}
            </div>

            {videos.length === 0 && <div className="text-center text-teal-100 mt-8">No videos found matching your criteria</div>}
        </div>
    );
};

export default VideoGridContent;
