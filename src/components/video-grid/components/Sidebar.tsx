import { categories } from '../constants/video';
interface SidebarProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTags: string[];
    toggleTag: (tag: string) => void;
    allTags: string[];
    isOpen: boolean;
    onToggle: () => void;
}
const symbols: Record<string, string> = {
    all: '◫',
    nature: '♧',
    'night-city': '☾',
    cafe: '♨',
    work: '▤',
    reading: '▥',
    focus: '◎',
    sleep: '☾',
};
export default function Sidebar({
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTag,
    allTags,
    isOpen,
    onToggle,
}: SidebarProps) {
    const group = (ids: string[]) =>
        categories
            .filter((c) => ids.includes(c.id))
            .map((c) => (
                <button
                    key={c.id}
                    aria-pressed={selectedCategory === c.id}
                    className={`category ${selectedCategory === c.id ? 'selected' : ''}`}
                    onClick={() => {
                        setSelectedCategory(c.id);
                        if (isOpen) onToggle();
                    }}
                >
                    <span aria-hidden="true">{symbols[c.id]}</span>
                    {c.name.replace(/^[^A-Za-z]+/, '')}
                    {selectedCategory === c.id && <i aria-hidden="true" />}
                </button>
            ));
    return (
        <aside className="sidebar">
            <button className="mobile-filter" onClick={onToggle} aria-expanded={isOpen} aria-controls="category-panel">
                Browse categories <span>{isOpen ? '−' : '+'}</span>
            </button>
            <div id="category-panel" className={`sidebar-inner ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-label">YOUR SPACE</div>
                {group(['all'])}
                <div className="sidebar-label">FIND YOUR FOCUS</div>
                {group(['work', 'reading', 'focus', 'sleep'])}
                <div className="sidebar-label">CHANGE THE SCENERY</div>
                {group(['nature', 'night-city', 'cafe'])}
                <details className="tag-details">
                    <summary>Explore tags {selectedTags.length > 0 && `(${selectedTags.length})`}</summary>
                    <div className="tag-list">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                aria-pressed={selectedTags.includes(tag)}
                                className={selectedTags.includes(tag) ? 'selected' : ''}
                                onClick={() => toggleTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </details>
                <div className="sidebar-note">
                    <span aria-hidden="true">❧</span>
                    <p>
                        Nothing to rush.
                        <br />
                        Nowhere else to be.
                    </p>
                </div>
            </div>
        </aside>
    );
}
