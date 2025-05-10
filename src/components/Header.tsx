'use client'
import React, { useCallback } from "react";

type Tab = 'videos' | 'channels';

interface HeaderProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    const linkClass = (tab: Tab) =>
        `font-semibold text-white hover:text-teal-200 transition-colors ` +
        (activeTab === tab ? 'underline decoration-2' : 'opacity-75');

    const handleVideosClick = useCallback(() => {
        onTabChange('videos');
    }, [onTabChange]);

    const handleChannelsClick = useCallback(() => {
        onTabChange('channels');
    }, [onTabChange]);

    return (
        <header className="sticky top-0 z-50 bg-teal-900/95 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-2">
                    <nav className="flex gap-6 text-lg">
                        <button
                            onClick={handleVideosClick}
                            className={linkClass('videos')}
                        >
                            Videos
                        </button>
                        <button
                            onClick={handleChannelsClick}
                            className={linkClass('channels')}
                        >
                            Channels
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

export default React.memo(Header);