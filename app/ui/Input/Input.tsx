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
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
  const labelShown = !hideLabel && !isEmpty;
  const valueRef = useRef(value);

  useEffect(() => {
    if (value) {
      setIsEmpty(false);
    } else if (!!valueRef.current) {
      setIsEmpty(true);
    }

    valueRef.current = value;
  }, [value]);

  return (
    <div className="relative flex flex-1">
      <div
        className={styles.label}
        style={{
          opacity: labelShown ? 1 : 0,
          transition: "opacity 0.075s ease-in-out",
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
          onChange?.(e.target.value);
          setIsEmpty(!e.target.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : disabled ? bgColor3 : bgColor2,
          paddingTop: labelShown ? 16 : undefined,
          pointerEvents: disabled ? "none" : undefined,
          transition: "padding-top 0.075s ease-in-out",
          ...style,
        }}
        autoFocus={autoFocus}
      />
    </div>
  );
};
