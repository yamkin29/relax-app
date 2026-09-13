export const STYLES = {
    card: {
        wrapper: 'block group video-card',
        container: 'video-card-inner',
        image: 'object-cover video-image',
        overlay: 'play-overlay',
        playButton: { container: 'play-button', icon: 'w-6 h-6' },
        title: { container: 'video-caption', text: 'video-title' },
    },
} as const;
