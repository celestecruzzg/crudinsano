'use client';

import { createContext, useContext, useState, ReactNode, FC } from 'react';
import Modal from '@/app/components/ui/modal/Modal';

interface ModalContextType {
  showModal: (content: ReactNode) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>(null);

  const showModal = (content: ReactNode) => {
    setModalContent(content);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    // Pequeño delay para que la animación de salida se complete
    setTimeout(() => {
      setModalContent(null);
    }, 300);
  };

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <Modal isOpen={isOpen} onClose={hideModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

