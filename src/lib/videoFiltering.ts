import { SortOption, Video } from '@/components/video-grid/types/video';

export interface VideoFilterState {
    category: string;
    query: string;
    tags: string[];
    sortBy: SortOption;
}

const collator = new Intl.Collator('en-US', { numeric: true, sensitivity: 'base' });

export const filterAndSortVideos = (videos: Video[], { category, query, tags, sortBy }: VideoFilterState): Video[] => {
    const normalizedQuery = query.toLowerCase();

    return videos
        .filter(
            (video) =>
                (category === 'all' || video.category === category) &&
                video.title.toLowerCase().includes(normalizedQuery) &&
                (tags.length === 0 || tags.every((tag) => video.tags.includes(tag))),
        )
        .sort((a, b) => {
            switch (sortBy) {
                case 'title-asc':
                    return collator.compare(a.title, b.title);
                case 'title-desc':
                    return collator.compare(b.title, a.title);
                case 'category-asc':
                    return collator.compare(a.category, b.category);
                case 'category-desc':
                    return collator.compare(b.category, a.category);
                default:
                    return 0;
            }
        });
};
