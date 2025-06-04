import React from 'react';
import Image from 'next/image';

const PlayIcon: React.FC = () => <Image src="/youtube-color-svgrepo-com.svg" alt="Youtube" width={24} height={24} className="w-6 h-6" />;

PlayIcon.displayName = 'PlayIcon';

export default React.memo(PlayIcon);
