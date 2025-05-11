import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

interface VideoModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ videoId, isOpen, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const opts = {
        height: '100%',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
            <div ref={modalRef} className="relative w-full max-w-4xl aspect-video bg-teal-800 rounded-lg overflow-hidden">
                <div className="w-full h-full">
                    <YouTube videoId={videoId} opts={opts} className="w-full h-full" />
                </div>
            </div>
        </div>
    );
};

export default VideoModal;
