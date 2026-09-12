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
    /** true, если данные канала загрузить не удалось — карточка покажет ошибку с retry */
    failed?: boolean;
    channelInfo?: ChannelInfo;
    popularVideos: PopularVideo[];
}
