import { ChannelInfo, PopularVideo } from '@/types/youtube';
import { validateYouTubeUsername, validateYouTubeChannelId } from '@/utils/youtube';

export const getChannelInfo = async (channelId: string): Promise<ChannelInfo | null> => {
    if (!validateYouTubeChannelId(channelId)) {
        throw new Error('Invalid channel ID format');
    }

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
    if (validateYouTubeChannelId(username)) {
        return username;
    }

    if (!validateYouTubeUsername(username)) {
        throw new Error('Invalid username format');
    }

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

export const getPopularVideos = async (channelId: string): Promise<PopularVideo[]> => {
    if (!validateYouTubeChannelId(channelId)) {
        throw new Error('Invalid channel ID format');
    }

    try {
        const response = await fetch(`/api/youtube?channelId=${channelId}&getPopularVideos=true`);
        if (!response.ok) {
            throw new Error('Failed to fetch popular videos');
        }
        const data = await response.json();
        return data.videos;
    } catch (error) {
        console.error('Error fetching popular videos:', error);
        return [];
    }
};
