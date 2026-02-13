import { useState, useCallback } from 'react';
import type { MouseEvent } from 'react';

export const useModal = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = useCallback((e?: MouseEvent<HTMLAnchorElement> | MouseEvent<HTMLButtonElement> | MouseEvent) => {
        if (e) {
            e.preventDefault();
        }
        setShowModal(true);
    }, []);
    const closeModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const modalProps = {
        open: showModal,
        onClose: closeModal,
    };

    return {
        showModal,
        openModal,
        closeModal,
        modalProps, 
    };
};