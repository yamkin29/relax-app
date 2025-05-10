'use client'
import React, { useCallback } from "react";
import { Tab } from "@/components/header/types/header";
import {HEADER_TEXTS, STYLES} from "@/components/header/constants/header";
import NavLink from "@/components/header/components/NavLink";
import ActionButton from "@/components/header/components/ActionButton";

export interface HeaderProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
    const handleVideosClick = useCallback(() => {
        onTabChange('videos');
    }, [onTabChange]);

    const handleChannelsClick = useCallback(() => {
        onTabChange('channels');
    }, [onTabChange]);

    return (
        <header className={STYLES.header}>
            <div className={STYLES.container}>
                <div className={STYLES.nav}>
                    <nav className={STYLES.navLinks}>
                        <NavLink 
                            isActive={activeTab === 'videos'} 
                            onClick={handleVideosClick}
                        >
                            {HEADER_TEXTS.VIDEOS}
                        </NavLink>
                        <NavLink 
                            isActive={activeTab === 'channels'} 
                            onClick={handleChannelsClick}
                        >
                            {HEADER_TEXTS.CHANNELS}
                        </NavLink>
                    </nav>
                    <div className={STYLES.actions}>
                        <ActionButton>
                            {HEADER_TEXTS.SETTINGS}
                        </ActionButton>
                        <ActionButton variant="primary">
                            {HEADER_TEXTS.LOGIN}
                        </ActionButton>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);