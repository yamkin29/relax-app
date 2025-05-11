import { YOUTUBE_API_BASE } from '@/constants/youtube';
import { YouTubeApiResponse, ChannelInfo } from '@/types/youtube';

export const buildYouTubeApiUrl = (endpoint: string, params: Record<string, string | number | boolean>): string => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        searchParams.append(key, String(value));
    });
    return `${YOUTUBE_API_BASE}${endpoint}?${searchParams.toString()}`;
};

export const transformChannelResponse = (data: YouTubeApiResponse): ChannelInfo | null => {
    if (!data.items || data.items.length === 0) {
        return null;
    }

    const channel = data.items[0];
    return {
        id: channel.id,
        title: channel.snippet?.title || '',
        description: channel.snippet?.description || '',
        thumbnails: channel.snippet?.thumbnails || {},
        statistics: channel.statistics || {},
    };
};

export const validateYouTubeUsername = (username: string): boolean => {
    return /^[a-zA-Z0-9_-]{3,30}$/.test(username);
};

export const validateYouTubeChannelId = (channelId: string): boolean => {
    return /^UC[a-zA-Z0-9_-]{22}$/.test(channelId);
};
