import React from 'react';
import Image from 'next/image';

const RutubeIcon: React.FC = () => <Image src="/Icon_rutube.svg" alt="Rutube" width={24} height={24} className="w-6 h-6" />;

RutubeIcon.displayName = 'RutubeIcon';

export default React.memo(RutubeIcon);
