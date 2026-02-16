import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC, useEffect, useRef, useState } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (text: string) => void;
  error?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  defaultValue,
  onChange,
  error,
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
      <div className={styles.label} style={{ opacity: isEmpty ? 0 : 1 }}>
        {placeholder}
      </div>
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange?.(e.target.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : bgColor2,
          paddingTop: isEmpty ? undefined : 26,
        }}
      />
    </div>
  );
};
