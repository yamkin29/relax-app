import { Category, SortOptionConfig } from '@/components/videoGrid/types/video';

export const categories: Category[] = [
    { id: 'all', name: 'All Videos', icon: '🎥' },
    { id: 'nature', name: '🌿 Nature', description: 'Forest, mountains, beach' },
    { id: 'night-city', name: '🌃 Night City', description: 'Urban night walks' },
    { id: 'cafe', name: '☕ Cafe', description: 'Home atmosphere' },
    { id: 'work', name: '💼 Work', description: 'Work atmosphere' },
    { id: 'reading', name: '📚 Reading', description: 'For reading and studying' },
    { id: 'focus', name: '💭 Focus', description: 'Focus practices' },
    { id: 'sleep', name: '💤 Sleep', description: 'For better sleep' },
];

export const sortOptions: SortOptionConfig[] = [
    { id: 'title-asc', name: 'Title (A-Z)' },
    { id: 'title-desc', name: 'Title (Z-A)' },
    { id: 'category-asc', name: 'Category (A-Z)' },
    { id: 'category-desc', name: 'Category (Z-A)' },
];
