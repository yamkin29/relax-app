"use client";

import { useState } from "react";
import rawVideos from '../../data/videos.json';
import Sidebar from './components/Sidebar';
import SearchAndSortControls from './components/SearchAndSortControls';
import ActiveFilters from './components/ActiveFilters';
import VideoGridContent from './components/VideoGridContent';
import {RawVideo, SortOption, Video} from "@/components/videoGrid/types/video";

const videos: Video[] = (rawVideos as RawVideo[]).map(video => ({
    ...video,
    thumbnail: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    link: `https://www.youtube.com/watch?v=${video.youtubeId}`
}));

const VideoGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("title-asc");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = Array.from(new Set(videos.flatMap(video => video.tags)));

    const filteredVideos = videos
        .filter(video => 
            (selectedCategory === "all" || video.category === selectedCategory) &&
            video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedTags.length === 0 || selectedTags.every(tag => video.tags.includes(tag)))
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

    const toggleTag = (tag: string) => {
        setSelectedTags(prev => 
            prev.includes(tag) 
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleClearAll = () => {
        setSelectedCategory("all");
        setSelectedTags([]);
    };

    return (
        <div className="flex relative">
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-2 left-4 z-50 p-2 rounded-lg bg-teal-700 text-white hover:bg-teal-600 transition-colors shadow-lg"
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

            <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                allTags={allTags}
                isOpen={isSidebarOpen}
            />

            <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'ml-80' : 'ml-0'}`}>
                <SearchAndSortControls
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />

                <ActiveFilters
                    selectedCategory={selectedCategory}
                    selectedTags={selectedTags}
                    onClearAll={handleClearAll}
                />

                <VideoGridContent videos={filteredVideos} />
            </div>
        </div>
    );
};

export default VideoGrid;