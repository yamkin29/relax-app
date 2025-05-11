interface CacheData<T> {
    data: T;
    timestamp: number;
}

const CACHE_KEYS = {
    CHANNELS: 'channels_cache',
} as const;

const CACHE_DURATION = 24 * 60 * 60 * 1000;

export const cacheUtils = {
    set: <T>(key: string, data: T): void => {
        const cacheData: CacheData<T> = {
            data,
            timestamp: Date.now(),
        };
        localStorage.setItem(key, JSON.stringify(cacheData));
    },

    get: <T>(key: string): T | null => {
        const cached = localStorage.getItem(key);
        if (!cached) return null;

        const { data, timestamp }: CacheData<T> = JSON.parse(cached);
        const isExpired = Date.now() - timestamp > CACHE_DURATION;

        if (isExpired) {
            localStorage.removeItem(key);
            return null;
        }

        return data;
    },

    isExpired: (key: string): boolean => {
        const cached = localStorage.getItem(key);
        if (!cached) return true;

        const { timestamp }: CacheData<any> = JSON.parse(cached);
        return Date.now() - timestamp > CACHE_DURATION;
    },

    keys: CACHE_KEYS,
}; 