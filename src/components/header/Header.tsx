'use client';
import React, { useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { HEADER_TEXTS, STYLES } from '@/components/header/constants/header';
import NavLink from '@/components/header/components/NavLink';
import RutubeIcon from '@/components/header/components/RutubeIcon';
import { ThemeContext } from '@/components/ThemeProvider';
import { Button } from 'antd';
import { BulbFilled, BulbOutlined } from '@ant-design/icons';

const Header: React.FC = () => {
    const { mode, toggleTheme } = useContext(ThemeContext);

    const router = useRouter();
    const pathname = usePathname();

    const handleVideosClick = () => {
        router.push('/videos');
    };

    const handleChannelsClick = () => {
        router.push('/channels');
    };

    const handleAboutClick = () => {
        router.push('/about');
    };

    return (
        <header className={STYLES.header}>
            <div className={STYLES.container}>
                <div className={STYLES.nav}>
                    <nav className={STYLES.navLinks}>
                        <NavLink isActive={pathname === '/videos'} onClick={handleVideosClick}>
                            {HEADER_TEXTS.VIDEOS}
                        </NavLink>
                        <NavLink isActive={pathname === '/channels'} onClick={handleChannelsClick}>
                            {HEADER_TEXTS.CHANNELS}
                        </NavLink>
                        <NavLink isActive={pathname === '/about'} onClick={handleAboutClick}>
                            {HEADER_TEXTS.ABOUT}
                        </NavLink>
                    </nav>
                    <div className={STYLES.actions}>
                        <RutubeIcon />
                    </div>
                    <Button
                        shape="circle"
                        size="large"
                        onClick={toggleTheme}
                        title="Toggle Theme"
                        icon={mode === 'light' ? <BulbOutlined /> : <BulbFilled />}
                    />
                </div>
            </div>
        </header>
    );
};

export default React.memo(Header);
