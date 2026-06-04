import { bgColor2, bgColor3, errorColor2 } from "@/lib/constants";
import {
  CSSProperties,
  FC,
  HTMLInputTypeAttribute,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./Input.module.css";
import { Eye, EyeOff } from "../Icons";

interface InputProps {
  ref?: RefObject<any>;
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
  ref,
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  type,
  disabled,
  autoFocus = false,
  hideLabel,
  style,
  loading,
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
  const [showContent, setShowContent] = useState(false);
  const labelShown = !hideLabel && !isEmpty;
  const lastChangeWasUser = useRef(false);
  const [showPassword, setShowPassword] = useState(false);

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
        ref={ref}
        placeholder={placeholder}
        type={showPassword ? undefined : type}
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
          paddingRight: type === "password" ? 50 : undefined,
          transition: lastChangeWasUser.current
            ? "padding-top 0.075s ease-in-out"
            : "none",
          ...style,
        }}
        autoFocus={autoFocus}
      />
      {type === "password" && (
        <div
          className="hover:opacity-50 cursor-pointer flex items-center"
          style={{
            position: "absolute",
            right: 16,
            height: 60,
          }}
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff /> : <Eye />}
        </div>
      )}
    </div>
  );
};
