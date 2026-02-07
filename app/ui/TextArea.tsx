import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC, HTMLInputTypeAttribute } from "react";

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
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => {
      onChange?.(e.target.value);
    }}
    style={{
      backgroundColor: error ? errorColor2 : bgColor2,
    }}
  />
);
