import VideoCard from "./VideoCard";

const videos = [
    { 
        thumbnail: "/thumb1.jpg", 
        link: "https://youtube.com/...",
        title: "Relaxing Ocean Waves"
    },
    { 
        thumbnail: "/thumb2.jpg", 
        link: "https://youtube.com/...",
        title: "Forest Ambience"
    },
    { 
        thumbnail: "/thumb3.jpg", 
        link: "https://youtube.com/...",
        title: "Rain Sounds"
    },
    { 
        thumbnail: "/thumb4.jpg", 
        link: "https://youtube.com/...",
        title: "Mountain Stream"
    },
    { 
        thumbnail: "/thumb5.jpg", 
        link: "https://youtube.com/...",
        title: "Night Forest"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/bNmP4NsYgRI/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=bNmP4NsYgRI&t=2192s&ab_channel=AmbientOutpost",
        title: "Ambient Outpost"
    }
];

const VideoGrid = () => (
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {videos.map((video, i) => (
                <VideoCard 
                    key={i} 
                    thumbnail={video.thumbnail} 
                    link={video.link}
                    title={video.title}
                />
            ))}
        </div>
    </div>
);

export default VideoGrid;