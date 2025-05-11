import React from 'react';
import YouTube from 'react-youtube';

interface VideoModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
    if (!isOpen) return null;

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="fixed inset-0 bg-teal-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-teal-800 p-4 rounded-lg relative">
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                    ×
                </button>
                <YouTube videoId={videoId} opts={opts} />
            </div>
        </div>
    );
};

export default VideoModal; 