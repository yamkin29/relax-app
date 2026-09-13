'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { HEADER_TEXTS, STYLES } from '@/components/header/constants/header';
import NavLink from '@/components/header/components/NavLink';

const Header: React.FC = () => {
    const pathname = usePathname();

    return (
        <header className={STYLES.header}>
            <div className={STYLES.container}>
                <div className={STYLES.nav}>
                    <nav className={STYLES.navLinks}>
                        <NavLink href="/videos" isActive={pathname === '/videos'}>
                            {HEADER_TEXTS.VIDEOS}
                        </NavLink>
                        <NavLink href="/channels" isActive={pathname === '/channels'}>
                            {HEADER_TEXTS.CHANNELS}
                        </NavLink>
                        <NavLink href="/about" isActive={pathname === '/about'}>
                            {HEADER_TEXTS.ABOUT}
                        </NavLink>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);
