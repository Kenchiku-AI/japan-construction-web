import { ModalContent } from "@/types";
import { useState } from "react";

export const useModalData = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent>();

  const showModal = (content: ModalContent) => {
    setIsOpen(true);
    setModalContent(content);
  };

  const onClose = () => {
    setIsOpen(false);

    setTimeout(() => {
      setModalContent(undefined);
    }, 500);
  };

  return {
    showModal,
    isOpen,
    onClose,
    modalContent,
  };
};
