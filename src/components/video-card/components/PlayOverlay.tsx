import React from 'react';
import { STYLES } from '@/components/video-card/constants/video-card';
import PlayIcon from '@/components/video-card/components/PlayIcon';
import RutubeIcon from '@/components/ui/icons/RutubeIcon';

interface PlayOverlayProps {
    onRutubeClick?: (e: React.MouseEvent) => void;
}

const PlayOverlay: React.FC<PlayOverlayProps> = ({ onRutubeClick }) => (
    <div className={STYLES.card.overlay}>
        <div className={STYLES.card.playButton.container}>
            <PlayIcon />
        </div>
        {onRutubeClick && (
            <button type="button" onClick={onRutubeClick} aria-label="Watch on Rutube" className={STYLES.card.playButton.rutubeContainer}>
                <RutubeIcon />
            </button>
        )}
    </div>
);

PlayOverlay.displayName = 'PlayOverlay';

export default React.memo(PlayOverlay);
