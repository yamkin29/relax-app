'use client';
import React, { useEffect, useRef } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    label: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, label, children }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        // Escape: нативный cancel не закрываем напрямую — идём через состояние React,
        // чтобы владелец модалки updated своё isOpen.
        const handleCancel = (e: Event) => {
            e.preventDefault();
            onClose();
        };
        const handleClose = () => onClose();

        dialog.addEventListener('cancel', handleCancel);
        dialog.addEventListener('close', handleClose);

        return () => {
            dialog.removeEventListener('cancel', handleCancel);
            dialog.removeEventListener('close', handleClose);
        };
    }, [onClose]);

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Закрытый диалог не рендерим совсем: иначе плееры внутри карточек
    // монтировались бы все сразу (29 iframe на /videos).
    if (!isOpen) return null;

    return (
        <dialog
            ref={dialogRef}
            aria-label={label}
            onClick={(e) => {
                if (e.target === dialogRef.current) {
                    onClose();
                }
            }}
            className="fixed inset-0 m-auto w-full max-w-4xl aspect-video bg-teal-800 rounded-lg overflow-hidden p-0 border-0 focus:outline-none [&::backdrop]:bg-black/80"
        >
            {children}
        </dialog>
    );
};

export default Modal;
