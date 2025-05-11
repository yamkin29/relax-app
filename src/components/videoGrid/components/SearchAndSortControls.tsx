import { SortOption } from '@/components/videoGrid/types/video';
import { sortOptions } from '@/components/videoGrid/constants/video';

interface SearchAndSortControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
}

const SearchAndSortControls = ({ searchQuery, setSearchQuery, sortBy, setSortBy }: SearchAndSortControlsProps) => {
    return (
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white placeholder-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
            </div>

            <div className="w-full sm:w-48">
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-4 py-2 rounded-lg bg-teal-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                    {sortOptions.map((option) => (
                        <option key={option.id} value={option.id}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default SearchAndSortControls;
