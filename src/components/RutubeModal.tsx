import React, { useEffect, useRef } from 'react';

interface RutubeModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}

const RutubeModal: React.FC<RutubeModalProps> = ({ videoId, isOpen, onClose }) => {
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

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={handleBackdropClick}>
            <div ref={modalRef} className="relative w-full max-w-4xl aspect-video bg-teal-800 rounded-lg overflow-hidden">
                <div className="w-full h-full">
                    <iframe
                        src={`https://rutube.ru/play/embed/${videoId}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
};

export default RutubeModal;
