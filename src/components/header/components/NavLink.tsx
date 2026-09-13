import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = React.memo(({ href, isActive, children }) => {
    const linkClass = `nav-link ${isActive ? 'is-active' : ''}`;

    return (
        <Link href={href} aria-current={isActive ? 'page' : undefined} className={linkClass}>
            {children}
        </Link>
    );
});

NavLink.displayName = 'NavLink';

export default NavLink;
