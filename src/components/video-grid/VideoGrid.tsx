'use client';
import { useMemo, useState } from 'react';
import rawVideos from '../../data/videos.json';
import Sidebar from './components/Sidebar';
import SearchAndSortControls from './components/SearchAndSortControls';
import ActiveFilters from './components/ActiveFilters';
import VideoGridContent from './components/VideoGridContent';
import { RawVideo, SortOption, Video } from '@/components/video-grid/types/video';
import { filterAndSortVideos } from '@/lib/videoFiltering';

const videos: Video[] = (rawVideos as RawVideo[]).map((video) => ({
    ...video,
    thumbnail: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
    link: `https://www.youtube.com/watch?v=${video.youtubeId}`,
}));

const VideoGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('title-asc');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const allTags = useMemo(() => Array.from(new Set(videos.flatMap((video) => video.tags))), []);

    const filteredSortedVideos = useMemo(
        () =>
            filterAndSortVideos(videos, {
                category: selectedCategory,
                query: searchQuery,
                tags: selectedTags,
                sortBy,
            }),
        [selectedCategory, searchQuery, selectedTags, sortBy],
    );

    const toggleTag = (tag: string) => {
        setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
    };

    const handleClearAll = () => {
        setSelectedCategory('all');
        setSelectedTags([]);
    };

    return (
        <div className="flex relative">
            <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                allTags={allTags}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className={`flex-1 p-4 transition-all duration-300 ${isSidebarOpen ? 'md:ml-80' : 'ml-0'}`}>
                <div className="mt-12 md:mt-0">
                    <SearchAndSortControls
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    <ActiveFilters selectedCategory={selectedCategory} selectedTags={selectedTags} onClearAll={handleClearAll} />

                    <VideoGridContent videos={filteredSortedVideos} />
                </div>
            </div>
        </div>
    );
};

export default VideoGrid;
