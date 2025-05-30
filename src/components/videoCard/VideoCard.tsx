'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { STYLES } from '@/components/videoCard/constants/videoCard';
import PlayOverlay from '@/components/videoCard/components/PlayOverlay';
import VideoModal from '../VideoModal';

interface VideoCardProps {
    thumbnail: string;
    link: string;
    title?: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, link, title }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const videoId = link.split('v=')[1]?.split('&')[0];

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (videoId) {
            setIsModalOpen(true);
        }
    };

    return (
        <>
            <a href={link} onClick={handleClick} className={STYLES.card.wrapper}>
                <div className={STYLES.card.container}>
                    <div className="relative w-full h-0 pb-[56.25%]">
                        <Image
                            src={thumbnail}
                            alt={title ?? 'Video thumbnail'}
                            fill
                            sizes="(max-width: 640px) 100vw, 640px"
                            className={STYLES.card.image}
                            priority={false}
                        />
                        <PlayOverlay />
                    </div>
                    {title && (
                        <div className={STYLES.card.title.container}>
                            <h3 className={STYLES.card.title.text}>{title}</h3>
                        </div>
                    )}
                </div>
            </a>
            {videoId && <VideoModal videoId={videoId} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </>
    );
};

VideoCard.displayName = 'VideoCard';

export default React.memo(VideoCard);
