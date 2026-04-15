import { bgColor2, bgColor3, errorColor2 } from "@/lib/constants";
import {
  CSSProperties,
  FC,
  HTMLInputTypeAttribute,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Input.module.css";

interface InputProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  autoFocus?: boolean;
  hideLabel?: boolean;
  loading?: boolean;
  style?: CSSProperties;
}

export const Input: FC<InputProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  type,
  disabled,
  autoFocus,
  hideLabel,
  style,
  loading,
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
  const [showContent, setShowContent] = useState(false);
  const labelShown = !hideLabel && !isEmpty;
  const lastChangeWasUser = useRef(false);

  useEffect(() => {
    if (!lastChangeWasUser.current) {
      setIsEmpty(!value);
    }

    lastChangeWasUser.current = false;
  }, [value]);

  useEffect(() => {
    if (!loading) {
      setShowContent(false);

      requestAnimationFrame(() => {
        setShowContent(true);
      });
    }
  }, [loading]);

  if (loading || !showContent) {
    return (
      <div style={{ height: 60, background: bgColor2, borderRadius: 10 }} />
    );
  }

  return (
    <div className="relative flex flex-1">
      <div
        className={styles.label}
        style={{
          opacity: labelShown ? 1 : 0,
          transition: lastChangeWasUser.current
            ? "opacity 0.075s ease-in-out"
            : "none",
        }}
      >
        {placeholder}
      </div>
      <input
        placeholder={placeholder}
        type={type}
        className="input"
        value={value}
        defaultValue={defaultValue}
        onChange={(e) => {
          lastChangeWasUser.current = true;
          onChange?.(e.target.value);
          setIsEmpty(!e.target.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : disabled ? bgColor3 : bgColor2,
          paddingTop: labelShown ? 16 : undefined,
          pointerEvents: disabled ? "none" : undefined,
          transition: lastChangeWasUser.current
            ? "padding-top 0.075s ease-in-out"
            : "none",
          ...style,
        }}
        autoFocus={autoFocus}
      />
    </div>
  );
};
