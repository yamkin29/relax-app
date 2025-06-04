export const HEADER_TEXTS = {
    VIDEOS: 'Videos',
    CHANNELS: 'Channels',
    ABOUT: 'About',
    SETTINGS: 'Settings',
    LOGIN: 'Login',
    RUTUBE: 'Rutube',
} as const;

export const STYLES = {
    header: 'sticky top-0 z-50 bg-teal-900/95 backdrop-blur-sm shadow-lg',
    container: 'container mx-auto px-4',
    nav: 'flex justify-between items-center py-2',
    navLinks: 'flex gap-6 text-lg',
    actions: 'flex gap-4',
    button: {
        base: 'px-4 py-2 text-white hover:text-teal-200 transition-colors',
        primary: 'px-4 py-2 bg-teal-700 text-white rounded-lg hover:bg-teal-600 transition-colors',
    },
    rutubeLink: 'text-white hover:text-teal-200 transition-colors',
} as const;
