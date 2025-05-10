import React from "react";

interface NavLinkProps {
    isActive: boolean;
    onClick: () => void;
    children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = React.memo(({ isActive, onClick, children }) => {
    const linkClass = `font-semibold text-white hover:text-teal-200 transition-colors ${
        isActive ? 'underline decoration-2' : 'opacity-75'
    }`;

    return (
        <button onClick={onClick} className={linkClass}>
            {children}
        </button>
    );
});

NavLink.displayName = 'NavLink';

export default NavLink;