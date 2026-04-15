import { bgColor2, bgColor3, errorColor2 } from "@/lib/constants";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  error?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  disabled,
  loading,
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
  const textAreaRef = useRef<any>(null);
  const lastChangeWasUser = useRef(false);
  const [showContent, setShowContent] = useState(false);

  const resize = () => {
    const ta = textAreaRef.current;
    if (!ta) return;

    ta.style.height = "auto";
    ta.style.height = Math.max(100, ta.scrollHeight) + "px";
  };

  useEffect(() => {
    if (!lastChangeWasUser.current) {
      setIsEmpty(!value);
    }

    lastChangeWasUser.current = false;
    resize();
  }, [value]);

  useEffect(() => {
    if (!loading) {
      setShowContent(false);

      requestAnimationFrame(() => {
        setShowContent(true);

        if (showContent) resize();
      });
    }
  }, [loading, showContent]);

  if (loading || !showContent) {
    return (
      <div
        style={{
          height: 100,
          background: bgColor2,
          borderRadius: 10,
        }}
      />
    );
  }

  return (
    <div className="relative" style={{ marginBottom: -6 }}>
      <div
        className={styles.label}
        style={{
          opacity: isEmpty ? 0 : 1,
          transition: lastChangeWasUser.current
            ? "opacity 0.075s ease-in-out"
            : "none",
        }}
      >
        {placeholder}
      </div>
      <textarea
        ref={textAreaRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => {
          lastChangeWasUser.current = true;
          onChange?.(e.target.value);
          setIsEmpty(!e.target.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : disabled ? bgColor3 : bgColor2,
          paddingTop: isEmpty ? undefined : 26,
          pointerEvents: disabled ? "none" : undefined,
          transition: lastChangeWasUser.current
            ? "padding-top 0.075s ease-in-out"
            : "none",
        }}
      />
    </div>
  );
};
