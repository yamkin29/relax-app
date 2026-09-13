'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavLink from './components/NavLink';
export default function Header() {
    const pathname = usePathname();
    return (
        <header className="site-header">
            <Link href="/videos" className="brand">
                <svg className="brand-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M6 18c4 0 4-8 8-8s2 12 6 12 2-8 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span>relax-app</span>
            </Link>
            <nav aria-label="Main navigation">
                <NavLink href="/videos" isActive={pathname === '/videos'}>
                    Explore
                </NavLink>
                <NavLink href="/channels" isActive={pathname === '/channels'}>
                    Creators
                </NavLink>
                <NavLink href="/about" isActive={pathname === '/about'}>
                    About
                </NavLink>
            </nav>
            <span className="header-note">A little space to slow down</span>
        </header>
    );
}
