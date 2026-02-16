import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC, HTMLInputTypeAttribute, useEffect, useState } from "react";
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
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
  const labelShown = !hideLabel && !isEmpty;

  return (
    <div className="relative flex">
      <div className={styles.label} style={{ opacity: labelShown ? 1 : 0 }}>
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
          backgroundColor: error ? errorColor2 : bgColor2,
          paddingTop: labelShown ? 16 : undefined,
          height: labelShown ? 60 : 50,
        }}
        disabled={disabled}
        autoFocus={autoFocus}
      />
    </div>
  );
};
