import React from 'react';
import Modal from '@/components/ui/Modal';

interface RutubeModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
}

const RutubeModal: React.FC<RutubeModalProps> = ({ videoId, isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} label="Video player">
            <iframe
                src={`https://rutube.ru/play/embed/${videoId}`}
                title="Rutube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Modal>
    );
};

export default RutubeModal;
