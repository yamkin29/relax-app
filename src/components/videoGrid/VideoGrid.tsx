"use client";
import { useMemo, useState } from "react";
import rawVideos from '../../data/videos.json';
import Sidebar from './components/Sidebar';
import SearchAndSortControls from './components/SearchAndSortControls';
import ActiveFilters from './components/ActiveFilters';
import VideoGridContent from './components/VideoGridContent';
import { RawVideo, SortOption, Video } from "@/components/videoGrid/types/video";

const videos: Video[] = (rawVideos as RawVideo[]).map(video => ({
    ...video,
    thumbnail: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    link: `https://www.youtube.com/watch?v=${video.youtubeId}`
}));

const collator = new Intl.Collator('en-US', { numeric: true, sensitivity: 'base' })

const VideoGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState<SortOption>("title-asc");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(() => Array.from(new Set(videos.flatMap(video => video.tags))), []);

    const filteredSortedVideos = useMemo(() => {
        return videos
            .filter(video =>
                (selectedCategory === 'all' || video.category === selectedCategory) &&
                video.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
                (selectedTags.length === 0 || selectedTags.every(tag => video.tags.includes(tag)))
            )
            .sort((a, b) => {
                switch (sortBy) {
                    case 'title-asc':
                        return collator.compare(a.title, b.title)
                    case 'title-desc':
                        return collator.compare(b.title, a.title)
                    case 'category-asc':
                        return collator.compare(a.category, b.category)
                    case 'category-desc':
                        return collator.compare(b.category, a.category)
                    default:
                        return 0
                }
            })
    }, [selectedCategory, searchQuery, selectedTags, sortBy])

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

                <VideoGridContent videos={filteredSortedVideos} />
            </div>
        </div>
    );
};

export default VideoGrid;