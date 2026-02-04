import { FC, ReactNode } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { Close } from "@/app/ui/Icons";

interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
}) => (
  <div className={`modal ${isOpen ? "modal-open" : ""}`}>
    <div className="modal-box">
      <div className="flex flex-col">
        <button className="self-end hover:cursor-pointer" onClick={onClose}>
          <Close />
        </button>
      </div>
      {title && <Heading title={title} subtitle={subtitle} />}
      {children}
    </div>
  </div>
);

export default Modal;
