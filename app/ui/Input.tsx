import { FC, HTMLInputTypeAttribute } from "react";

interface InputProps {
  placeholder?: string;
  onChange?: (text: string) => void;
  error?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const Input: FC<InputProps> = ({
  placeholder,
  onChange,
  error,
  type,
}) => (
  <input
    placeholder={placeholder}
    type={type}
    className="input"
    onChange={(e) => {
      onChange?.(e.target.value);
    }}
    style={{
      backgroundColor: error ? "#FF636326" : "#A4A9AE26",
    }}
  />
);
