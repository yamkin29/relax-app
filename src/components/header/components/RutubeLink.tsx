import React from 'react';
import { STYLES } from '@/components/header/constants/header';
import RutubeIcon from '@/components/ui/icons/RutubeIcon';

const RutubeLink: React.FC = () => {
    return (
        <a
            href="https://rutube.ru/channel/46470222/"
            target="_blank"
            rel="noopener noreferrer"
            className={`${STYLES.rutubeLink} flex items-center gap-2`}
            aria-label="Rutube"
        >
            <span className="text-sm">My Rutube</span>
            <RutubeIcon />
        </a>
    );
};

export default React.memo(RutubeLink);
