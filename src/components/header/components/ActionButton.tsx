import {STYLES} from "@/components/header/constants/header";
import React from "react";
import {VariantButton} from "@/components/header/types/header";

interface ActionButtonProps {
    variant?: VariantButton;
    onClick?: () => void;
    children: React.ReactNode;
}

const ActionButton: React.FC<ActionButtonProps> = React.memo(({
                                                                  variant = 'default',
                                                                  onClick,
                                                                  children
                                                              }) => {
    const buttonClass = variant === 'primary'
        ? STYLES.button.primary
        : STYLES.button.base;

    return (
        <button onClick={onClick} className={buttonClass}>
            {children}
        </button>
    );
});

ActionButton.displayName = 'ActionButton';

export default ActionButton;