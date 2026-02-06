"use client";

import { createContext, FC, ReactNode, useContext } from "react";
import { useModalData } from "./useModalData";
import Modal from "@/app/ui/Modal";

type ModalData = ReturnType<typeof useModalData>;

// @ts-expect-error
const ModalContext = createContext<ModalData>({});

export const ModalProvider: FC<{ children: ReactNode | ReactNode[] }> = ({
  children,
}) => {
  const modalData = useModalData();
  const { modalContent, isOpen, onClose } = modalData;

  return (
    <ModalContext.Provider value={modalData}>
      <Modal
        title={modalContent?.title}
        subtitle={modalContent?.subtitle}
        isOpen={isOpen}
        onClose={onClose}
      >
        {modalContent?.children}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
