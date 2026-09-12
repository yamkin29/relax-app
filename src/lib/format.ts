export const formatViewCount = (count: string): string => {
    const num = parseInt(count);
    if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M views`;
    }
    if (num >= 1000) {
        return `${(num / 1000).toFixed(1)}K views`;
    }
    return `${num} views`;
};

export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export const formatLastUpdated = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const formatTimeUntilExpiry = (timestamp: number, now: number = Date.now()): string => {
    const expiryTime = timestamp + 24 * 60 * 60 * 1000; // 24 hours from timestamp
    const timeLeft = expiryTime - now;

    const hours = Math.floor(timeLeft / (60 * 60 * 1000));
    const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000));

    return `${hours}h ${minutes}m`;
};
