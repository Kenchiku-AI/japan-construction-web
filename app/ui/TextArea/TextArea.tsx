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
  animationDisabled?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
  disabled,
  animationDisabled,
}) => {
  const [isEmpty, setIsEmpty] = useState(!value && !defaultValue);
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
    <div className="relative" style={{ marginBottom: -6 }}>
      <div
        className={styles.label}
        style={{
          opacity: isEmpty ? 0 : 1,
          transition: animationDisabled ? "none" : "opacity 0.075s ease-in-out",
        }}
      >
        {placeholder}
      </div>
      <textarea
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : disabled ? bgColor3 : bgColor2,
          paddingTop: isEmpty ? undefined : 26,
          pointerEvents: disabled ? "none" : undefined,
          transition: animationDisabled
            ? "none"
            : "padding-top 0.075s ease-in-out",
        }}
      />
    </div>
  );
};
