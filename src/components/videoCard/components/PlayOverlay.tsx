import React from 'react';
import { STYLES } from '@/components/videoCard/constants/videoCard';
import PlayIcon from '@/components/videoCard/components/PlayIcon';

const PlayOverlay: React.FC = () => (
    <div className={STYLES.card.overlay}>
        <div className={STYLES.card.playButton.container}>
            <PlayIcon />
        </div>
    </div>
);

PlayOverlay.displayName = 'PlayOverlay';

export default React.memo(PlayOverlay);
