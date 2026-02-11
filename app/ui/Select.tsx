import { bgColor2, errorColor2, fontColor1, fontColor2 } from "@/lib/constants";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";

interface SelectOption {
  value?: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  onChange?: (value?: string | number) => void;
  placeholder?: string;
  hidePlaceholder?: boolean;
  error?: boolean;
  style?: CSSProperties;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  hidePlaceholder,
  error,
  style,
}) => {
  const [isUnselected, setIsUnselected] = useState(
    placeholder || !options[0]?.value,
  );
  const valueRef = useRef(value);

  useEffect(() => {
    if (valueRef.current && !value) {
      setIsUnselected(true);
    }

    valueRef.current = value;
  }, [value]);

  return (
    <select
      className="select"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target;
        const option = options.find((o) => o.value === value);
        onChange?.(option?.value);
        setIsUnselected(!option?.value);
      }}
      style={{
        backgroundColor: error ? errorColor2 : bgColor2,
        backgroundImage:
          "linear-gradient(45deg, #0000 50%, #23303B 50%), linear-gradient(135deg, #23303B 50%, #0000 50%)",
        color: isUnselected ? fontColor2 : fontColor1,
        ...style,
      }}
    >
      {placeholder && (
        <option
          value=""
          disabled
          style={{ display: hidePlaceholder ? "none" : "flex" }}
        >
          {placeholder}
        </option>
      )}
      {options.map((option, index) => (
        <option
          key={option.value ?? `select_option_${index}`}
          value={option.value}
          style={{ color: option.value ? fontColor1 : fontColor2 }}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
