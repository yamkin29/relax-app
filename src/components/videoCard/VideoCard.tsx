'use client'
import React from 'react'
import Image from 'next/image'
import { STYLES } from '@/components/videoCard/constants/videoCard'
import PlayOverlay from '@/components/videoCard/components/PlayOverlay'

interface VideoCardProps {
    thumbnail: string
    link: string
    title?: string
}

const VideoCard: React.FC<VideoCardProps> = ({ thumbnail, link, title }) => (
    <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={STYLES.card.wrapper}
    >
        <div className={STYLES.card.container}>
            <div className="relative w-full h-0 pb-[56.25%]"> {/* 16:9 соотношение */}
                <Image
                    src={thumbnail}
                    alt={title ?? 'Video thumbnail'}
                    fill
                    sizes="(max-width: 640px) 100vw, 640px"
                    className={STYLES.card.image}
                    priority={false}     // для LCP можно поставить true, если это критичная картинка
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
)

VideoCard.displayName = 'VideoCard'

export default React.memo(VideoCard)