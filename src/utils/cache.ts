interface CacheData<T> {
    data: T;
    timestamp: number;
}

const CACHE_KEYS = {
    CHANNELS: 'channels_cache',
} as const;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export const cacheUtils = {
    set: <T>(key: string, data: T): void => {
        const cacheData: CacheData<T> = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    },

    get: <T>(key: string): { data: T; timestamp: number } | null => {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const cacheData: CacheData<T> = JSON.parse(cached);
        const isExpired = Date.now() - cacheData.timestamp > CACHE_DURATION;

        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }

        return cacheData;
    },

    isExpired: (key: string): boolean => {
        const cached = localStorage.getItem(key);
        if (!cached) return true;

        const { timestamp }: CacheData<unknown> = JSON.parse(cached);
        return Date.now() - timestamp > CACHE_DURATION;
    },

    keys: CACHE_KEYS,
};
