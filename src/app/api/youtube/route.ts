import { NextResponse } from 'next/server';
import { YOUTUBE_API_KEY, YOUTUBE_REVALIDATE_SECONDS } from '@/constants/youtube';
import { YOUTUBE_API_ENDPOINTS, YOUTUBE_API_PARTS, YOUTUBE_API_ERROR_MESSAGES } from '@/constants/youtube';
import { buildYouTubeApiUrl, transformChannelResponse, validateYouTubeChannelId } from '@/utils/youtube';
import { YouTubeApiResponse, YouTubeVideosResponse } from '@/types/youtube';

const FETCH_OPTIONS = { next: { revalidate: YOUTUBE_REVALIDATE_SECONDS } } as const;

interface VideoStatisticsItem {
    id: string;
    statistics?: { viewCount: string };
}

class YouTubeApiError extends Error {
    constructor(
        message: string,
        readonly status: number,
    ) {
        super(message);
    }
}

async function fetchJson<T>(url: string): Promise<T> {
    const response = await fetch(url, FETCH_OPTIONS);

    if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: { message?: string } } | null;
        throw new YouTubeApiError(body?.error?.message || `YouTube API responded with status ${response.status}`, response.status);
    }

    return response.json() as Promise<T>;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const channelId = searchParams.get('channelId');
    const getPopularVideos = searchParams.get('getPopularVideos') === 'true';

    try {
        if (channelId) {
            if (!validateYouTubeChannelId(channelId)) {
                return NextResponse.json({ error: 'Invalid channel ID format' }, { status: 400 });
            }

            if (getPopularVideos) {
                const searchUrl = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.SEARCH, {
                    part: YOUTUBE_API_PARTS.SNIPPET,
                    channelId: channelId,
                    order: 'viewCount',
                    type: 'video',
                    maxResults: 2,
                    key: YOUTUBE_API_KEY,
                });

                const searchData = await fetchJson<YouTubeVideosResponse>(searchUrl);

                if (!searchData.items || searchData.items.length === 0) {
                    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
                }

                const statsUrl = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.VIDEOS, {
                    part: YOUTUBE_API_PARTS.STATISTICS,
                    id: searchData.items.map((video) => video.id.videoId).join(','),
                    key: YOUTUBE_API_KEY,
                });

                const statsData = await fetchJson<{ items?: VideoStatisticsItem[] }>(statsUrl);

                const statsById = new Map((statsData.items ?? []).map((item) => [item.id, item]));

                const videosWithStats = searchData.items.map((video) => ({
                    id: video.id.videoId,
                    title: video.snippet.title,
                    thumbnail:
                        video.snippet.thumbnails.maxres?.url ||
                        video.snippet.thumbnails.high?.url ||
                        video.snippet.thumbnails.medium?.url ||
                        video.snippet.thumbnails.default?.url,
                    viewCount: statsById.get(video.id.videoId)?.statistics?.viewCount || '0',
                    publishedAt: video.snippet.publishedAt,
                }));

                return NextResponse.json({ videos: videosWithStats });
            }

            const url = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.CHANNELS, {
                part: [YOUTUBE_API_PARTS.SNIPPET, YOUTUBE_API_PARTS.STATISTICS].join(','),
                id: channelId,
                key: YOUTUBE_API_KEY,
            });

            const data = await fetchJson<YouTubeApiResponse>(url);

            const channelInfo = transformChannelResponse(data);
            if (!channelInfo) {
                return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND }, { status: 404 });
            }

            return NextResponse.json(channelInfo);
        }

        return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.INVALID_PARAMETERS }, { status: 400 });
    } catch (error) {
        if (error instanceof YouTubeApiError) {
            console.error('YouTube API Error:', error.message);
            return NextResponse.json({ error: error.message }, { status: error.status });
        }

        console.error('YouTube API Error:', error);
        return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.API_ERROR }, { status: 500 });
    }
}
