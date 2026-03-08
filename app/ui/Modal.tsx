import { FC, ReactNode } from "react";
import { Heading } from "@/app/ui/Heading/Heading";
import { Close } from "@/app/ui/Icons";
import { Button } from "./Button/Button";
import { useTranslation } from "react-i18next";

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
}) => {
  const { t } = useTranslation();

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div className="modal-box md:min-w-3xl min-w-full">
        <div className="flex flex-col">
          <button className="self-end hover:cursor-pointer" onClick={onClose}>
            <Close />
          </button>
        </div>
        {title && <Heading title={title} subtitle={subtitle} />}
        {children ? (
          children
        ) : (
          <div className="mt-10">
            <Button label={t("ok")} onClick={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
