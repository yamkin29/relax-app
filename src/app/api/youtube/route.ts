import { NextResponse } from 'next/server';
import { YOUTUBE_API_KEY } from '@/constants/youtube';
import { YOUTUBE_API_ENDPOINTS, YOUTUBE_API_PARTS, YOUTUBE_API_ERROR_MESSAGES } from '@/constants/youtube';
import { buildYouTubeApiUrl, transformChannelResponse, validateYouTubeChannelId } from '@/utils/youtube';
import { YouTubeApiResponse, YouTubeVideosResponse } from '@/types/youtube';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const channelId = searchParams.get('channelId');
    const getPopularVideos = searchParams.get('getPopularVideos') === 'true';

    console.warn('YouTube API Request:', { username, channelId, getPopularVideos });

    try {
        if (username) {
            if (validateYouTubeChannelId(username)) {
                console.warn('Username is a channel ID, using it directly');
                const url = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.CHANNELS, {
                    part: [YOUTUBE_API_PARTS.SNIPPET, YOUTUBE_API_PARTS.STATISTICS].join(','),
                    id: username,
                    key: YOUTUBE_API_KEY,
                });

                console.warn('Fetching channel by ID:', url);
                const response = await fetch(url);
                const data: YouTubeApiResponse = await response.json();

                if (!response.ok) {
                    console.error('YouTube API Error:', data);
                    return NextResponse.json({ error: data.error?.message || 'Failed to fetch channel' }, { status: response.status });
                }

                if (!data.items || data.items.length === 0) {
                    console.warn('No channel found for ID:', username);
                    return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND }, { status: 404 });
                }

                return NextResponse.json({ channelId: data.items[0].id });
            }

            console.warn('Searching for channel by name:', username);
            const searchUrl = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.SEARCH, {
                part: YOUTUBE_API_PARTS.SNIPPET,
                q: username,
                type: 'channel',
                maxResults: 1,
                key: YOUTUBE_API_KEY,
            });

            console.warn('Search URL:', searchUrl);
            const searchResponse = await fetch(searchUrl);
            const searchData = await searchResponse.json();

            if (!searchResponse.ok) {
                console.error('Search API Error:', searchData);
                return NextResponse.json(
                    { error: searchData.error?.message || 'Failed to search channel' },
                    { status: searchResponse.status },
                );
            }

            if (!searchData.items || searchData.items.length === 0) {
                console.warn('No channel found in search for:', username);
                return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND }, { status: 404 });
            }

            const foundChannelId = searchData.items[0].id.channelId;
            console.warn('Found channel ID from search:', foundChannelId);

            const channelUrl = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.CHANNELS, {
                part: [YOUTUBE_API_PARTS.SNIPPET, YOUTUBE_API_PARTS.STATISTICS].join(','),
                id: foundChannelId,
                key: YOUTUBE_API_KEY,
            });

            const channelResponse = await fetch(channelUrl);
            const channelData: YouTubeApiResponse = await channelResponse.json();

            if (!channelResponse.ok || !channelData.items || channelData.items.length === 0) {
                console.warn('Failed to get channel details for ID:', foundChannelId);
                return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND }, { status: 404 });
            }

            return NextResponse.json({ channelId: foundChannelId });
        }

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

                const searchResponse = await fetch(searchUrl);
                const searchData: YouTubeVideosResponse = await searchResponse.json();

                if (!searchData.items || searchData.items.length === 0) {
                    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
                }

                const videosWithStats = await Promise.all(
                    searchData.items.map(async (video) => {
                        const statsUrl = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.VIDEOS, {
                            part: YOUTUBE_API_PARTS.STATISTICS,
                            id: video.id.videoId,
                            key: YOUTUBE_API_KEY,
                        });

                        const statsResponse = await fetch(statsUrl);
                        const statsData = await statsResponse.json();

                        return {
                            id: video.id.videoId,
                            title: video.snippet.title,
                            thumbnail:
                                video.snippet.thumbnails.maxres?.url ||
                                video.snippet.thumbnails.high?.url ||
                                video.snippet.thumbnails.medium?.url ||
                                video.snippet.thumbnails.default?.url,
                            viewCount: statsData.items[0]?.statistics?.viewCount || '0',
                            publishedAt: video.snippet.publishedAt,
                        };
                    }),
                );

                return NextResponse.json({ videos: videosWithStats });
            }

            const url = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.CHANNELS, {
                part: [YOUTUBE_API_PARTS.SNIPPET, YOUTUBE_API_PARTS.STATISTICS].join(','),
                id: channelId,
                key: YOUTUBE_API_KEY,
            });

            const response = await fetch(url);
            const data: YouTubeApiResponse = await response.json();

            const channelInfo = transformChannelResponse(data);
            if (!channelInfo) {
                return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND }, { status: 404 });
            }

            return NextResponse.json(channelInfo);
        }

        return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.INVALID_PARAMETERS }, { status: 400 });
    } catch (error) {
        console.error('YouTube API Error:', error);
        return NextResponse.json({ error: YOUTUBE_API_ERROR_MESSAGES.API_ERROR }, { status: 500 });
    }
}
