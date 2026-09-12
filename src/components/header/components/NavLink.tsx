import Link from 'next/link';
import React from 'react';

interface NavLinkProps {
    href: string;
    isActive: boolean;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = React.memo(({ href, isActive, children }) => {
    const linkClass = `font-semibold text-white hover:text-teal-200 transition-colors ${
        isActive ? 'underline decoration-2' : 'opacity-75'
    }`;

    return (
        <Link href={href} className={linkClass}>
            {children}
        </Link>
    );
});

NavLink.displayName = 'NavLink';

export default NavLink;
