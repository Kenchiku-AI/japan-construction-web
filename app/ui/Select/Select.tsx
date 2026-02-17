import {
  bgColor2,
  bgColor3,
  errorColor2,
  fontColor1,
  fontColor2,
} from "@/lib/constants";
import { CSSProperties, FC, useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";

interface SelectOption {
  value?: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string | number;
  defaultValue?: string | number;
  onChange?: (value?: string | number) => void;
  placeholder?: string;
  hidePlaceholder?: boolean;
  hideLabel?: boolean;
  error?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
  placeholder,
  hidePlaceholder,
  hideLabel,
  error,
  style,
  disabled,
}) => {
  const [isUnselected, setIsUnselected] = useState(!options[0]?.value);
  const [isEmpty, setIsEmpty] = useState(false);
  const labelShown = !hideLabel && !isEmpty;
  const valueRef = useRef(value);

  useEffect(() => {
    if (valueRef.current && !value) {
      setIsUnselected(true);
    }

    if (value) {
      setIsEmpty(false);
    } else if (!!valueRef.current) {
      setIsEmpty(true);
    }

    valueRef.current = value;
  }, [value]);

  return (
    <div className="relative flex">
      <div className={styles.label} style={{ opacity: labelShown ? 1 : 0 }}>
        {placeholder}
      </div>
      <select
        className="select"
        value={value}
        defaultValue={defaultValue}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const { value } = e.target;
          const option = options.find((o) => o.value === value);
          onChange?.(option?.value);
          setIsUnselected(!option?.value);
        }}
        style={{
          backgroundColor: error ? errorColor2 : disabled ? bgColor3 : bgColor2,
          backgroundImage: disabled
            ? "none"
            : "linear-gradient(45deg, #0000 50%, #23303B 50%), linear-gradient(135deg, #23303B 50%, #0000 50%)",
          color: isUnselected ? fontColor2 : fontColor1,
          paddingTop: labelShown ? 16 : undefined,
          pointerEvents: disabled ? "none" : undefined,
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
    </div>
  );
};

export default Select;
