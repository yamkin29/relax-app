"use client";

import VideoCard from "./VideoCard";
import { useState } from "react";

type Video = {
    thumbnail: string;
    link: string;
    title: string;
    category: string;
};

const videos: Video[] = [
    // Ambient Music
    { 
        thumbnail: "https://img.youtube.com/vi/bNmP4NsYgRI/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=bNmP4NsYgRI",
        title: "Ambient Outpost - Relaxing Ambient Music",
        category: "ambient"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        title: "Relaxing Music for Stress Relief",
        category: "ambient"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/4Y1lZQsyuSQ/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=4Y1lZQsyuSQ",
        title: "Calm Piano Music",
        category: "ambient"
    },
    // Lofi
    { 
        thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        title: "lofi hip hop radio - beats to relax/study to",
        category: "lofi"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/7NOSDKb0HlU/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=7NOSDKb0HlU",
        title: "Jazz Hip Hop Mix - Beats to Relax/Study",
        category: "lofi"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/jfKfPfyJRdk/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
        title: "lofi hip hop radio - beats to sleep/chill to",
        category: "lofi"
    },
    // Nature Sounds
    { 
        thumbnail: "https://img.youtube.com/vi/1HZ0U9ZJ2_0/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1HZ0U9ZJ2_0",
        title: "Rain Sounds For Sleeping - 99% Instantly Fall Asleep",
        category: "nature"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/nMfPqeZjc2c/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=nMfPqeZjc2c",
        title: "Ocean Waves for Sleeping",
        category: "nature"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/3yJoXf9hqXk/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=3yJoXf9hqXk",
        title: "Forest Stream Sounds",
        category: "nature"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/nMfPqeZjc2c/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=nMfPqeZjc2c",
        title: "Thunderstorm Sounds",
        category: "nature"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/3yJoXf9hqXk/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=3yJoXf9hqXk",
        title: "Mountain Stream",
        category: "nature"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/1HZ0U9ZJ2_0/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1HZ0U9ZJ2_0",
        title: "Forest Night Sounds",
        category: "nature"
    },
    // Meditation
    { 
        thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        title: "Meditation Music",
        category: "meditation"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        title: "Relaxing Music for Deep Sleep",
        category: "meditation"
    },
    // ASMR
    { 
        thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        title: "ASMR Rain Sounds",
        category: "asmr"
    },
    { 
        thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/maxresdefault.jpg", 
        link: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
        title: "ASMR Ocean Waves",
        category: "asmr"
    }
];

const categories = [
    { id: "all", name: "All Videos" },
    { id: "ambient", name: "Ambient Music" },
    { id: "lofi", name: "Lofi Music" },
    { id: "nature", name: "Nature Sounds" },
    { id: "meditation", name: "Meditation" },
    { id: "asmr", name: "ASMR" }
];

const VideoGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredVideos = selectedCategory === "all" 
        ? videos 
        : videos.filter(video => video.category === selectedCategory);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className="w-64 min-h-screen bg-teal-900 p-4">
                <h2 className="text-xl font-bold text-white mb-4">Categories</h2>
                <div className="space-y-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                                selectedCategory === category.id
                                    ? "bg-teal-700 text-white"
                                    : "text-teal-100 hover:bg-teal-800"
                            }`}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Video Grid */}
            <div className="flex-1 p-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredVideos.map((video, i) => (
                            <VideoCard 
                                key={i} 
                                thumbnail={video.thumbnail} 
                                link={video.link}
                                title={video.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;