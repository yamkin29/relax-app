import React from 'react';
import YouTube from 'react-youtube';
import Modal from '@/components/ui/Modal';

interface VideoModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} label="Video player">
            <div className="w-full h-full">
                <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
            </div>
        </Modal>
    );
};

export default VideoModal;
