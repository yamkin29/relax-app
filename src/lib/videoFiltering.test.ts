import { describe, expect, it } from 'vitest';
import { Video } from '@/components/video-grid/types/video';
import { filterAndSortVideos } from './videoFiltering';

const videos: Video[] = [
    { title: 'Rainy Cafe', youtubeId: 'a1', category: 'cafe', tags: ['rain', 'chill'], thumbnail: '', link: '' },
    { title: 'Dark Forest', youtubeId: 'b2', category: 'nature', tags: ['forest', 'nature'], thumbnail: '', link: '' },
    { title: 'Night Highway', youtubeId: 'c3', category: 'night-city', tags: ['night', 'drive'], thumbnail: '', link: '' },
    { title: 'Rainy Forest', youtubeId: 'd4', category: 'nature', tags: ['rain', 'forest'], thumbnail: '', link: '' },
];

describe('filterAndSortVideos — category', () => {
    it("'all' returns everything", () => {
        expect(filterAndSortVideos(videos, { category: 'all', query: '', tags: [], sortBy: 'title-asc' })).toHaveLength(4);
    });

    it('filters by category', () => {
        const result = filterAndSortVideos(videos, { category: 'nature', query: '', tags: [], sortBy: 'title-asc' });
        expect(result.map((v) => v.youtubeId)).toEqual(['b2', 'd4']);
    });
});

describe('filterAndSortVideos — search', () => {
    it('is case-insensitive', () => {
        const result = filterAndSortVideos(videos, { category: 'all', query: 'RAINY', tags: [], sortBy: 'title-asc' });
        expect(result.map((v) => v.youtubeId)).toEqual(['a1', 'd4']);
    });

    it('returns nothing when nothing matches', () => {
        const result = filterAndSortVideos(videos, { category: 'all', query: 'ocean', tags: [], sortBy: 'title-asc' });
        expect(result).toHaveLength(0);
    });
});

describe('filterAndSortVideos — tags', () => {
    it('requires every selected tag (AND logic)', () => {
        const result = filterAndSortVideos(videos, { category: 'all', query: '', tags: ['rain', 'forest'], sortBy: 'title-asc' });
        expect(result.map((v) => v.youtubeId)).toEqual(['d4']);
    });
});

describe('filterAndSortVideos — sorting', () => {
    it('sorts by title ascending and descending', () => {
        const asc = filterAndSortVideos(videos, { category: 'all', query: '', tags: [], sortBy: 'title-asc' });
        expect(asc.map((v) => v.title)).toEqual(['Dark Forest', 'Night Highway', 'Rainy Cafe', 'Rainy Forest']);

        const desc = filterAndSortVideos(videos, { category: 'all', query: '', tags: [], sortBy: 'title-desc' });
        expect(desc.map((v) => v.title)).toEqual(['Rainy Forest', 'Rainy Cafe', 'Night Highway', 'Dark Forest']);
    });

    it('sorts by category ascending', () => {
        const result = filterAndSortVideos(videos, { category: 'all', query: '', tags: [], sortBy: 'category-asc' });
        expect(result.map((v) => v.category)).toEqual(['cafe', 'nature', 'nature', 'night-city']);
    });
});
