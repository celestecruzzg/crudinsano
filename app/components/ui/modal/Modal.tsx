'use client';

import { FC, ReactNode, MouseEvent } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/5 z-50 flex justify-center items-center p-4 animate-fade-in"
      onClick={handleOverlayClick}
    >
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md animate-slide-up">
        {children}
      </div>
    </div>
  );
};

export default Modal;
