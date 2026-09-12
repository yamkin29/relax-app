interface CacheData<T> {
    data: T;
    timestamp: number;
}

const CACHE_KEYS = {
    CHANNELS: 'channels_cache',
} as const;

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const readCache = <T>(key: string): CacheData<T> | null => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    try {
        return JSON.parse(cached) as CacheData<T>;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
};

const isEntryExpired = (timestamp: number): boolean => {
    return Date.now() - timestamp > CACHE_DURATION;
};

export const cacheUtils = {
    set: <T>(key: string, data: T): void => {
        const cacheData: CacheData<T> = {
            data,
            timestamp: Date.now(),
        };

        try {
            localStorage.setItem(key, JSON.stringify(cacheData));
        } catch (error) {
            console.error(`Failed to cache data for key "${key}":`, error);
        }
    },

    get: <T>(key: string): { data: T; timestamp: number } | null => {
        const cacheData = readCache<T>(key);
        if (!cacheData) return null;

        if (isEntryExpired(cacheData.timestamp)) {
            localStorage.removeItem(key);
            return null;
        }

        return { data: cacheData.data, timestamp: cacheData.timestamp };
    },

    isExpired: (key: string): boolean => {
        const cacheData = readCache<unknown>(key);
        return !cacheData || isEntryExpired(cacheData.timestamp);
    },

    keys: CACHE_KEYS,
};
