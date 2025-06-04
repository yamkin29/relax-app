import React from 'react';
import { STYLES } from '../constants/header';

const RutubeIcon: React.FC = () => {
    return (
        <a
            href="https://rutube.ru/channel/46470222/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${STYLES.rutubeLink} flex items-center gap-2`}
            aria-label="Rutube"
        >
            <span className="text-sm">My Rutube</span>
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 16.5V7.5L16.5 12L10.5 16.5Z"
                    fill="currentColor"
                />
                <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.5 16.5V7.5L16.5 12L10.5 16.5Z"
                    fill="currentColor"
                    fillOpacity="0.3"
                />
            </svg>
        </a>
    );
};

export default React.memo(RutubeIcon);
