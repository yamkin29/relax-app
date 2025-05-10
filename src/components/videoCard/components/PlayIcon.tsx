import React from "react";
import {STYLES} from "@/components/videoCard/constants/videoCard";

const PlayIcon: React.FC = () => (
    <svg
        className={STYLES.card.playButton.icon}
        fill="currentColor"
        viewBox="0 0 24 24"
    >
        <path d="M8 5v14l11-7z"/>
    </svg>
);

PlayIcon.displayName = 'PlayIcon';

export default React.memo(PlayIcon);