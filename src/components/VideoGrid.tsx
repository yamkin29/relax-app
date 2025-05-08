"use client";

import VideoCard from "./VideoCard";
import { useState } from "react";

type Video = {
    thumbnail: string;
    link: string;
    title: string;
    category: string;
};

type SortOption = "title-asc" | "title-desc" | "category-asc" | "category-desc";

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

const sortOptions = [
    { id: "title-asc", name: "Title (A-Z)" },
    { id: "title-desc", name: "Title (Z-A)" },
    { id: "category-asc", name: "Category (A-Z)" },
    { id: "category-desc", name: "Category (Z-A)" }
];

const VideoGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("title-asc");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Filter videos based on category and search query
    const filteredVideos = videos
        .filter(video => 
            (selectedCategory === "all" || video.category === selectedCategory) &&
            video.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            switch (sortBy) {
                case "title-asc":
                    return a.title.localeCompare(b.title);
                case "title-desc":
                    return b.title.localeCompare(a.title);
                case "category-asc":
                    return a.category.localeCompare(b.category);
                case "category-desc":
                    return b.category.localeCompare(a.category);
                default:
                    return 0;
            }
        });

    return (
        <div className="flex relative">
            {/* Sidebar Toggle Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-teal-700 text-white hover:bg-teal-600 transition-colors shadow-lg"
            >
                <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${isSidebarOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" 
                    />
                </svg>
            </button>

            {/* Sidebar */}
            <div 
                className={`fixed top-0 left-0 h-full bg-teal-900 p-4 transition-transform duration-300 ease-in-out z-40 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ width: '16rem' }}
            >
                <div className="mt-12">
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
            </div>

            {/* Main Content */}
            <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-0'}`}>
                {/* Search and Sort Controls */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>
                    
                    {/* Sort Dropdown */}
                    <div className="w-full sm:w-48">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortOption)}
                            className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                            {sortOptions.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Results Count */}
                <div className="mb-4 text-teal-100">
                    Found {filteredVideos.length} video{filteredVideos.length !== 1 ? 's' : ''}
                </div>

                {/* Video Grid */}
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

                {/* No Results Message */}
                {filteredVideos.length === 0 && (
                    <div className="text-center text-teal-100 mt-8">
                        No videos found matching your criteria
                    </div>
                )}
            </div>
        </div>
    );
};

export default VideoGrid;