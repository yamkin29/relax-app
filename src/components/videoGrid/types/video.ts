export interface RawVideo {
    title: string;
    youtubeId: string;
    rutubeId?: string;
    category: string;
    tags: string[];
}

export interface Video extends RawVideo {
    thumbnail: string;
    link: string;
    rutubeLink?: string;
}

export type SortOption = 'title-asc' | 'title-desc' | 'category-asc' | 'category-desc';

export interface Category {
    id: string;
    name: string;
    icon?: string;
    description?: string;
}

export interface SortOptionConfig {
    id: SortOption;
    name: string;
}
