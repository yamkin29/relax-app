import { ChannelInfo, PopularVideo } from '@/types/youtube';

export interface RawChannel {
    id: string;
    name: string;
    channelId: string;
    youtubeUrl: string;
}

export interface Channel extends RawChannel {
    videoCount: number;
    profileImage: string;
    channelInfo?: ChannelInfo;
    popularVideos: PopularVideo[];
}
