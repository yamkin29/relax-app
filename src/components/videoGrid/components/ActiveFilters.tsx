import { categories } from '@/components/videoGrid/constants/video';

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
                <div className="px-3 py-1 bg-teal-700 text-white rounded-full text-sm">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                </div>
            )}
            {selectedTags.map((tag) => (
                <div key={tag} className="px-3 py-1 bg-teal-700 text-white rounded-full text-sm">
                    #{tag}
                </div>
            ))}
            <button onClick={onClearAll} className="px-3 py-1 bg-teal-800 text-white rounded-full text-sm hover:bg-teal-700">
                Clear all
            </button>
        </div>
    );
};

export default ActiveFilters;
