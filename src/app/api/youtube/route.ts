import { NextResponse } from 'next/server';
import { YOUTUBE_API_KEY } from '@/constants/youtube';
import { YOUTUBE_API_ENDPOINTS, YOUTUBE_API_PARTS, YOUTUBE_API_ERROR_MESSAGES } from '@/constants/youtube';
import { buildYouTubeApiUrl, transformChannelResponse, validateYouTubeUsername, validateYouTubeChannelId } from '@/utils/youtube';
import { YouTubeApiResponse } from '@/types/youtube';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const channelId = searchParams.get('channelId');

    console.log('YouTube API Request:', { username, channelId });

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