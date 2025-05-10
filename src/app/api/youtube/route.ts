import { NextResponse } from 'next/server';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const channelId = searchParams.get('channelId');

    console.log('YouTube API Request:', { username, channelId });

    try {
        if (username) {
            // Get channel ID by username
            const url = `${YOUTUBE_API_BASE}/channels?part=id&forUsername=${username}&key=${YOUTUBE_API_KEY}`;
            console.log('Fetching channel ID:', url);
            
            const response = await fetch(url);
            const data = await response.json();
            console.log('Channel ID response:', data);

            if (!data.items || data.items.length === 0) {
                console.log('No channel found for username:', username);
                return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
            }

            return NextResponse.json({ channelId: data.items[0].id });
        }

        if (channelId) {
            // Get channel info by ID
            const url = `${YOUTUBE_API_BASE}/channels?part=snippet,statistics&id=${channelId}&key=${YOUTUBE_API_KEY}`;
            console.log('Fetching channel info:', url);
            
            const response = await fetch(url);
            const data = await response.json();
            console.log('Channel info response:', data);

            if (!data.items || data.items.length === 0) {
                console.log('No channel found for ID:', channelId);
                return NextResponse.json({ error: 'Channel not found' }, { status: 404 });
            }

            const channel = data.items[0];
            return NextResponse.json({
                id: channel.id,
                title: channel.snippet?.title,
                description: channel.snippet?.description,
                thumbnails: channel.snippet?.thumbnails,
                statistics: channel.statistics
            });
        }

        return NextResponse.json({ error: 'Missing username or channelId parameter' }, { status: 400 });
    } catch (error) {
        console.error('YouTube API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch YouTube data' }, { status: 500 });
    }
} 