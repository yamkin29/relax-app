export interface YouTubeThumbnails {
    default?: { url: string };
    medium?: { url: string };
    high?: { url: string };
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

export interface YouTubeApiResponse {
    items: YouTubeChannel[];
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