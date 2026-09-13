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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
        <div className="explore-layout">
            <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedTags={selectedTags}
                toggleTag={toggleTag}
                allTags={allTags}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            <div className="explore-content">
                <div>
                    <div className="intro">
                        <div className="eyebrow">YOUR EVERYDAY ESCAPE</div>
                        <h1>A moment of calm.</h1>
                        <p>Find your atmosphere. Settle in. Let the world slow down.</p>
                    </div>
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
