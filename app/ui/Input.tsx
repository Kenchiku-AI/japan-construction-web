import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC, HTMLInputTypeAttribute } from "react";

interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: (text: string) => void;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const Input: FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  error,
  type,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    className="input"
    value={value}
    onChange={(e) => {
      onChange?.(e.target.value);
    }}
    style={{
      backgroundColor: error ? errorColor2 : bgColor2,
    }}
  />
);
