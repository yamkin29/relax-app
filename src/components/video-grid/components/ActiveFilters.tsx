import { Button } from '@/components/ui/button';
import { categories } from '@/components/video-grid/constants/video';

interface ActiveFiltersProps {
    selectedCategory: string;
    selectedTags: string[];
    onClearAll: () => void;
}

const ActiveFilters = ({ selectedCategory, selectedTags, onClearAll }: ActiveFiltersProps) => {
    if (selectedTags.length === 0 && selectedCategory === 'all') {
        return null;
    }

    return (
        <div className="mb-4 flex flex-wrap gap-2">
            {selectedCategory !== 'all' && (
                <div className="h-auto px-3 py-1 bg-[var(--selected)] text-[var(--ink)] rounded-full text-sm">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                </div>
            )}
            {selectedTags.map((tag) => (
                <div key={tag} className="h-auto px-3 py-1 bg-[var(--selected)] text-[var(--ink)] rounded-full text-sm">
                    #{tag}
                </div>
            ))}
            <Button
                variant="ghost"
                onClick={onClearAll}
                className="h-auto px-3 py-1 bg-[var(--surface)] text-[var(--accent)] rounded-full text-sm hover:bg-[var(--selected)]"
            >
                Clear all
            </Button>
        </div>
    );
};

export default ActiveFilters;
