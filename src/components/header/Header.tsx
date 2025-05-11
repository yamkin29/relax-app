'use client'
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { HEADER_TEXTS, STYLES } from "@/components/header/constants/header";
import NavLink from "@/components/header/components/NavLink";
import ActionButton from "@/components/header/components/ActionButton";

const Header: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();

    const handleVideosClick = () => {
        router.push('/videos');
    };

    const handleChannelsClick = () => {
        router.push('/channels');
    };

    return (
        <header className={STYLES.header}>
            <div className={STYLES.container}>
                <div className={STYLES.nav}>
                    <nav className={STYLES.navLinks}>
                        <NavLink 
                            isActive={pathname === '/videos'} 
                            onClick={handleVideosClick}
                        >
                            {HEADER_TEXTS.VIDEOS}
                        </NavLink>
                        <NavLink 
                            isActive={pathname === '/channels'} 
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