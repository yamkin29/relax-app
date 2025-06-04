import React from 'react';
import { STYLES } from '../constants/header';
import Image from 'next/image';

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
            <Image src="/Icon_rutube.svg" alt="Rutube" width={24} height={24} className="w-6 h-6" />
        </a>
    );
};

export default React.memo(RutubeIcon);
