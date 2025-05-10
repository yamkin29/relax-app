'use client'
import React from 'react';
import {STYLES} from "@/components/videoCard/constants/videoCard";
import PlayOverlay from "@/components/videoCard/components/PlayOverlay";

interface VideoCardProps {
    thumbnail: string;
    link: string;
    title?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({
    thumbnail, 
    link, 
    title 
}) => (
    <a 
        href={link} 
        target="_blank" 
        rel="noopener noreferrer" 
        className={STYLES.card.wrapper}
    >
        <div className={STYLES.card.container}>
            <div className="relative">
                <img 
                    src={thumbnail} 
                    alt={title || "Video thumbnail"} 
                    className={STYLES.card.image}
                />
                <PlayOverlay />
            </div>
            {title && (
                <div className={STYLES.card.title.container}>
                    <h3 className={STYLES.card.title.text}>
                        {title}
                    </h3>
                </div>
            )}
        </div>
    </a>
);

VideoCard.displayName = 'VideoCard';

export default React.memo(VideoCard);