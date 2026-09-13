import { SortOption } from '@/components/video-grid/types/video';
import { sortOptions } from '@/components/video-grid/constants/video';

interface SearchAndSortControlsProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
}

const SearchAndSortControls = ({ searchQuery, setSearchQuery, sortBy, setSortBy }: SearchAndSortControlsProps) => {
    return (
        <div className="search-controls">
            <div className="search-field">
                <input
                    type="text"
                    placeholder="Find rain, forests, a quiet café…"
                    aria-label="Search videos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="sort-field">
                <select
                    value={sortBy}
                    aria-label="Sort videos"
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="sort-select"
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
