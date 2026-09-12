import { ChannelInfo, PopularVideo } from '@/types/youtube';
import { validateYouTubeChannelId } from '@/utils/youtube';

// Сервис намеренно бросает исключения при сбоях: вызывающий код решает,
// как показать ошибку пользователю, а не получает молчаливый null/[].
export const getChannelInfo = async (channelId: string): Promise<ChannelInfo> => {
    if (!validateYouTubeChannelId(channelId)) {
        throw new Error(`Invalid channel ID: ${channelId}`);
    }

    const response = await fetch(`/api/youtube?channelId=${channelId}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch channel info (${response.status})`);
    }
    return (await response.json()) as ChannelInfo;
};

export const getPopularVideos = async (channelId: string): Promise<PopularVideo[]> => {
    if (!validateYouTubeChannelId(channelId)) {
        throw new Error(`Invalid channel ID: ${channelId}`);
    }

    const response = await fetch(`/api/youtube?channelId=${channelId}&getPopularVideos=true`);
    if (!response.ok) {
        throw new Error(`Failed to fetch popular videos (${response.status})`);
    }
    const data = (await response.json()) as { videos?: PopularVideo[] };
    return data.videos ?? [];
};
