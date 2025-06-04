export const STYLES = {
    card: {
        wrapper: 'block group',
        container: 'rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300 bg-teal-900 relative',
        image: 'w-full h-48 object-cover',
        overlay:
            'absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-4',
        playButton: {
            container:
                'w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-red-700',
            rutubeContainer:
                'w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300 hover:bg-blue-700',
            icon: 'w-6 h-6 text-white',
        },
        title: {
            container: 'p-4',
            text: 'text-lg font-semibold text-white group-hover:text-teal-200 transition-colors',
        },
    },
} as const;
