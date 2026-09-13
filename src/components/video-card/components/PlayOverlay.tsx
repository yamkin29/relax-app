import React from 'react';
import { STYLES } from '@/components/video-card/constants/video-card';
import PlayIcon from '@/components/video-card/components/PlayIcon';

const PlayOverlay: React.FC = () => (
    <div className={STYLES.card.overlay}>
        <div className={STYLES.card.playButton.container}>
            <PlayIcon />
        </div>
    </div>
);

PlayOverlay.displayName = 'PlayOverlay';

export default React.memo(PlayOverlay);
