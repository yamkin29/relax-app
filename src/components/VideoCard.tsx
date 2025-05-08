type VideoCardProps = {
    thumbnail: string;
    link: string;
    title?: string;
};

const VideoCard = ({ thumbnail, link, title }: VideoCardProps) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="block group">
        <div className="rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 bg-teal-900 relative">
            <div className="relative">
                <img 
                    src={thumbnail} 
                    alt={title || "Video thumbnail"} 
                    className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <svg 
                            className="w-6 h-6 text-white" 
                            fill="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                </div>
            </div>
            {title && (
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-white group-hover:text-teal-200 transition-colors">{title}</h3>
                </div>
            )}
        </div>
    </a>
);

export default VideoCard;