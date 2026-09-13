import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
                <Input
                    type="text"
                    placeholder="Find rain, forests, a quiet café…"
                    aria-label="Search videos"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-[46px] rounded-[9px] bg-popover px-4 text-base md:text-sm"
                />
            </div>

            <div className="sort-field">
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                    <SelectTrigger aria-label="Sort videos" className="h-[46px] rounded-[9px] bg-popover px-4">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id}>
                                {option.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default SearchAndSortControls;
