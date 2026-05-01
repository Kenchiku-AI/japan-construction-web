import { FC, ReactNode } from "react";
import { Close } from "@/app/ui/Icons";
import { Button } from "./Button/Button";
import { useTranslation } from "react-i18next";
import { fontColor2 } from "@/lib/constants";

interface ModalProps {
  title?: string;
  subtitle?: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  width?: number;
}

const Modal: FC<ModalProps> = ({
  title,
  subtitle,
  isOpen,
  onClose,
  children,
  width,
}) => {
  const { t } = useTranslation();

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}>
      <div
        className="modal-box"
        style={{
          maxWidth: width,
          maxHeight: "96vh",
        }}
      >
        <div className="flex flex-col">
          <button className="self-end hover:cursor-pointer" onClick={onClose}>
            <Close />
          </button>
        </div>
        {title && <div className="text-ellipsis text-2xl">{title}</div>}
        {subtitle && (
          <div className="mt-2" style={{ color: fontColor2 }}>
            {subtitle}
          </div>
        )}
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
