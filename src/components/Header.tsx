'use client'
import React from "react";

type Tab = 'videos' | 'channels' | 'other';

interface HeaderProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    const linkClass = (tab: Tab) =>
        `font-semibold text-white hover:text-teal-200 transition-colors ` +
        (activeTab === tab ? 'underline decoration-2' : 'opacity-75');

    return (
        <header className="sticky top-0 z-50 bg-teal-900/95 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-2">
                    <nav className="flex gap-6 text-lg">
                        <button
                            onClick={() => onTabChange('videos')}
                            className={linkClass('videos')}
                        >
                            Videos
                        </button>
                        <button
                            onClick={() => onTabChange('channels')}
                            className={linkClass('channels')}
                        >
                            Channels
                        </button>
                        <button
                            onClick={() => onTabChange('other')}
                            className={linkClass('other')}
                        >
                            Other
                        </button>
                    </nav>
                    <div className="flex gap-4">
                        <button className="px-4 py-2 text-white hover:text-teal-200 transition-colors">
                            Settings
                        </button>
                        <button className="px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;