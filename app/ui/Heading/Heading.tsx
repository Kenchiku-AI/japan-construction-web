import { FC, useEffect, useState } from "react";
import styles from "./Heading.module.css";
import { Input } from "../Input/Input";
import { Check, Close, Edit } from "../Icons";
import { errorColor1 } from "@/lib/constants";

interface HeadingProps {
  title: string;
  subtitle?: string;
  topLabel?: string;
  placeholder?: string;
  isEditable?: boolean;
  onEdit?: (value: string) => void;
}

export const Heading: FC<HeadingProps> = ({
  title,
  subtitle,
  topLabel,
  placeholder,
  isEditable,
  onEdit,
}) => {
  const [showEdit, setShowEdit] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [displayTitle, setDisplayTitle] = useState(title);
  const isUpdateNameEnabled = editedTitle && editedTitle !== displayTitle;

  useEffect(() => {
    setDisplayTitle(title);
  }, [title]);

  return (
    <div>
      <div className={styles.topLabel}>{topLabel}</div>
      {showEdit ? (
        <div className="flex gap-4" style={{ marginTop: -2 }}>
          <Input
            placeholder={placeholder}
            value={editedTitle}
            onChange={(t) => setEditedTitle(t)}
            style={{ fontSize: 24, height: 50, padding: 12 }}
            autoFocus
            hideLabel
          />
          <div className="flex justify-end items-center gap-2">
            <div
              className={isUpdateNameEnabled ? "cursor-pointer" : ""}
              onClick={() => {
                if (!isUpdateNameEnabled) return;

                setShowEdit(false);
                setDisplayTitle(editedTitle);
                onEdit?.(editedTitle);
              }}
              style={{
                opacity: isUpdateNameEnabled ? 1 : 0.4,
              }}
            >
              <Check size={36} />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                setShowEdit(false);
              }}
            >
              <Close color={errorColor1} size={36} />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex text-ellipsis items-center gap-4">
          <div className="text-ellipsis text-2xl lg:text-3xl">
            {displayTitle}
          </div>
          {isEditable && (
            <div
              className="cursor-pointer"
              onClick={() => {
                setEditedTitle(displayTitle);
                setShowEdit(true);
              }}
            >
              <Edit />
            </div>
          )}
        </div>
      )}
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
};
