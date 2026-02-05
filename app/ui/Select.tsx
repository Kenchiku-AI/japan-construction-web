import { bgColor2, errorColor2 } from "@/lib/constants";
import { FC } from "react";

interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  error?: boolean;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  error,
}) => {
  return (
    <select
      className="select"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value);
      }}
      style={{
        backgroundColor: error ? errorColor2 : bgColor2,
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
