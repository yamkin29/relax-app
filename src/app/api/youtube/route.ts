import { NextResponse } from 'next/server';
import { YOUTUBE_API_KEY } from '@/constants/youtube';
import { YOUTUBE_API_ENDPOINTS, YOUTUBE_API_PARTS, YOUTUBE_API_ERROR_MESSAGES } from '@/constants/youtube';
import { buildYouTubeApiUrl, transformChannelResponse, validateYouTubeUsername, validateYouTubeChannelId } from '@/utils/youtube';
import { YouTubeApiResponse, YouTubeVideosResponse } from '@/types/youtube';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const channelId = searchParams.get('channelId');
    const getPopularVideos = searchParams.get('getPopularVideos') === 'true';

    console.log('YouTube API Request:', { username, channelId, getPopularVideos });

    try {
        if (username) {
            if (!validateYouTubeUsername(username)) {
                return NextResponse.json(
                    { error: 'Invalid username format' },
                    { status: 400 }
                );
            }

            const url = buildYouTubeApiUrl(YOUTUBE_API_ENDPOINTS.CHANNELS, {
                part: YOUTUBE_API_PARTS.ID,
                forUsername: username,
                key: YOUTUBE_API_KEY,
            });

            const response = await fetch(url);
            const data: YouTubeApiResponse = await response.json();

            if (!data.items || data.items.length === 0) {
                return NextResponse.json(
                    { error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND },
                    { status: 404 }
                );
            }

            return NextResponse.json({ channelId: data.items[0].id });
        }

        if (channelId) {
            if (!validateYouTubeChannelId(channelId)) {
                return NextResponse.json(
                    { error: 'Invalid channel ID format' },
                    { status: 400 }
                );
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
                    return NextResponse.json(
                        { error: 'No videos found' },
                        { status: 404 }
                    );
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
                            thumbnail: video.snippet.thumbnails.maxres?.url || 
                                     video.snippet.thumbnails.high?.url || 
                                     video.snippet.thumbnails.medium?.url || 
                                     video.snippet.thumbnails.default?.url,
                            viewCount: statsData.items[0]?.statistics?.viewCount || '0',
                            publishedAt: video.snippet.publishedAt,
                        };
                    })
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
                return NextResponse.json(
                    { error: YOUTUBE_API_ERROR_MESSAGES.CHANNEL_NOT_FOUND },
                    { status: 404 }
                );
            }

            return NextResponse.json(channelInfo);
        }

        return NextResponse.json(
            { error: YOUTUBE_API_ERROR_MESSAGES.INVALID_PARAMETERS },
            { status: 400 }
        );
    } catch (error) {
        console.error('YouTube API Error:', error);
        return NextResponse.json(
            { error: YOUTUBE_API_ERROR_MESSAGES.API_ERROR },
            { status: 500 }
        );
    }
} 