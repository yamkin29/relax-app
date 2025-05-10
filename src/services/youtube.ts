export interface ChannelInfo {
    id: string;
    title: string;
    description: string;
    thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
    };
    statistics: {
        viewCount?: string;
        subscriberCount?: string;
        videoCount?: string;
    };
}

export const getChannelInfo = async (channelId: string): Promise<ChannelInfo | null> => {
    try {
        const response = await fetch(`/api/youtube?channelId=${channelId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch channel info');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching channel info:', error);
        return null;
    }
};

export const getChannelIdByUsername = async (username: string): Promise<string | null> => {
    try {
        const response = await fetch(`/api/youtube?username=${username}`);
        if (!response.ok) {
            throw new Error('Failed to fetch channel ID');
        }
        const data = await response.json();
        return data.channelId;
    } catch (error) {
        console.error('Error fetching channel ID:', error);
        return null;
    }
}; 