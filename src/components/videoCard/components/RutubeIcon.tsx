import React from 'react';
import { STYLES } from '@/components/videoCard/constants/videoCard';

const RutubeIcon: React.FC = () => (
    <svg className={STYLES.card.playButton.icon} fill="currentColor" viewBox="0 0 24 24">
        <path d="M8 5v14l11-7z" />
    </svg>
);

RutubeIcon.displayName = 'RutubeIcon';

export default React.memo(RutubeIcon);
