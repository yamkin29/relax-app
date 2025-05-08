type VideoCardProps = {
    thumbnail: string;
    link: string;
    title?: string;
};

const VideoCard = ({ thumbnail, link, title }: VideoCardProps) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 bg-teal-900">
            <img src={thumbnail} alt="Video thumbnail" className="w-full h-48 object-cover" />
            {title && (
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
            )}
        </div>
    </a>
);

export default VideoCard;