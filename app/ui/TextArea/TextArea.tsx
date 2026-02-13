import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC, useEffect, useState } from "react";
import styles from "./TextArea.module.css";

interface TextAreaProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  error?: boolean;
}

export const TextArea: FC<TextAreaProps> = ({
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [isEmpty, setIsEmpty] = useState(!value);

  useEffect(() => {
    setIsEmpty(!value);
  }, [value]);

  return (
    <div className="relative">
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
          paddingTop: isEmpty ? undefined : 27,
          height: isEmpty ? 100 : 110,
        }}
      />
    </div>
  );
};
