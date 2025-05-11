import { categories } from '@/components/videoGrid/constants/video';

interface SidebarProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    selectedTags: string[];
    toggleTag: (tag: string) => void;
    allTags: string[];
    isOpen: boolean;
    onToggle: () => void;
}

const Sidebar = ({ selectedCategory, setSelectedCategory, selectedTags, toggleTag, allTags, isOpen, onToggle }: SidebarProps) => {
    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full bg-teal-900 transition-transform duration-300 ease-in-out z-40 overflow-y-auto ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
                style={{ width: '20rem' }}
            >
                <div className="mt-12 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-white">Categories</h2>
                        {isOpen && (
                            <button
                                onClick={onToggle}
                                className="p-2 rounded-lg bg-teal-700 text-white hover:bg-teal-600 transition-colors shadow-lg"
                            >
                                <svg
                                    className="w-6 h-6 transition-transform duration-300 rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="space-y-2">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => setSelectedCategory(category.id)}
                                className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                                    selectedCategory === category.id ? 'bg-teal-700 text-white' : 'text-teal-100 hover:bg-teal-800'
                                }`}
                            >
                                <div className="flex items-center">
                                    <span className="text-xl mr-2">{category.icon}</span>
                                    <div>
                                        <div className="font-semibold">{category.name}</div>
                                        {category.description && <div className="text-sm text-teal-200">{category.description}</div>}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-bold text-white mb-3">Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {allTags.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                                        selectedTags.includes(tag)
                                            ? 'bg-teal-600 text-white'
                                            : 'bg-teal-800 text-teal-100 hover:bg-teal-700'
                                    }`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {!isOpen && (
                <button
                    onClick={onToggle}
                    className="fixed top-16 left-4 z-50 p-2 rounded-lg bg-teal-800/80 text-white hover:bg-teal-700 transition-colors shadow-lg border-2 border-teal-600/50 backdrop-blur-sm"
                >
                    <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}
        </>
    );
};

export default Sidebar;
