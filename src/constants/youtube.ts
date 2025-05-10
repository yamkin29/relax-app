export const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
export const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || '';

export const YOUTUBE_API_ENDPOINTS = {
    CHANNELS: '/channels',
    SEARCH: '/search',
    VIDEOS: '/videos',
} as const;

export const YOUTUBE_API_PARTS = {
    ID: 'id',
    SNIPPET: 'snippet',
    STATISTICS: 'statistics',
    CONTENT_DETAILS: 'contentDetails',
} as const;

export const YOUTUBE_API_ERROR_MESSAGES = {
    CHANNEL_NOT_FOUND: 'Channel not found',
    INVALID_PARAMETERS: 'Missing username or channelId parameter',
    API_ERROR: 'Failed to fetch YouTube data',
} as const; 