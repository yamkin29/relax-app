export interface YouTubeThumbnails {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
    maxres?: { url: string };
}

export interface YouTubeStatistics {
    viewCount?: string;
    subscriberCount?: string;
    videoCount?: string;
}

export interface YouTubeChannelSnippet {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
}

export interface YouTubeChannel {
    id: string;
    snippet?: YouTubeChannelSnippet;
    statistics?: YouTubeStatistics;
}

export interface YouTubeVideoSnippet {
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    publishedAt: string;
    channelId: string;
    channelTitle: string;
}

export interface YouTubeVideo {
    id: {
        videoId: string;
        kind: string;
    };
    snippet: YouTubeVideoSnippet;
    statistics?: {
        viewCount: string;
        likeCount: string;
        commentCount: string;
    };
}

export interface YouTubeApiResponse {
    items: YouTubeChannel[];
    pageInfo?: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken?: string;
    prevPageToken?: string;
}

export interface YouTubeVideosResponse {
    items: YouTubeVideo[];
    pageInfo?: {
        totalResults: number;
        resultsPerPage: number;
    };
    nextPageToken?: string;
    prevPageToken?: string;
}

export interface ChannelInfo {
    id: string;
    title: string;
    description: string;
    thumbnails: YouTubeThumbnails;
    statistics: YouTubeStatistics;
}

export interface PopularVideo {
    id: string;
    title: string;
    thumbnail: string;
    viewCount: string;
    publishedAt: string;
} 