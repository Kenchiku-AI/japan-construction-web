import {
  bgColor1,
  bgColor2,
  bgColor3,
  errorColor2,
  fontColor1,
  fontColor2,
} from "@/lib/constants";
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Select.module.css";
import { createPortal } from "react-dom";

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
  error?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
}

const Select: FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  error,
  style,
  disabled,
}) => {
  const [isUnselected, setIsUnselected] = useState(!value);
  const [isEmpty, setIsEmpty] = useState(true);
  const [open, setOpen] = useState(false);
  const valueRef = useRef(value);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});

  const selectedOption = useMemo(() => {
    return options.find((o) => o.value === value);
  }, [value, options]);

  const labelShown = !isEmpty;

  const backgroundColor = useMemo(() => {
    if (error) return errorColor2;
    if (disabled) return bgColor3;
    return bgColor2;
  }, [error, disabled]);

  useEffect(() => {
    setIsUnselected(!value);

    if (value) {
      setIsEmpty(false);
    } else if (!!valueRef.current) {
      setIsEmpty(true);
    }

    valueRef.current = value;
  }, [value]);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const maxHeight = Math.max(spaceBelow, spaceAbove) - 8; // padding from edge

      const openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;

      setDropdownStyles({
        position: "fixed",
        left: rect.left,
        width: rect.width,
        zIndex: 9999,
        maxHeight,
        overflowY: "auto",
        top: openUpward ? undefined : rect.bottom + 6,
        bottom: openUpward ? window.innerHeight - rect.top + 6 : undefined,
      });
    }
  }, [open]);

  const handleSelect = (option?: SelectOption) => {
    if (disabled) return;

    onChange?.(option?.value);
    setIsUnselected(!option?.value);
    setOpen(false);
  };

  return (
    <div className="relative flex">
      <div className={styles.label} style={{ opacity: labelShown ? 1 : 0 }}>
        {placeholder}
      </div>
      <div
        tabIndex={0}
        ref={triggerRef}
        className="select w-full cursor-pointer flex items-center justify-between focus:outline focus:outline-2"
        onClick={() => !disabled && setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        style={{
          backgroundColor,
          color: isUnselected ? fontColor2 : fontColor1,
          paddingTop: labelShown ? 16 : undefined,
          pointerEvents: disabled ? "none" : undefined,
          outlineColor: "var(--text-color-1)",
          borderBottomLeftRadius: open ? 0 : undefined,
          borderBottomRightRadius: open ? 0 : undefined,
          ...style,
        }}
      >
        <span>{selectedOption?.label || placeholder}</span>
      </div>
      {open &&
        !disabled &&
        typeof window !== "undefined" &&
        createPortal(
          <ul
            className="rounded-box p-2 ring-2 ring-offset-2"
            style={{
              ...dropdownStyles,
              backgroundColor: bgColor2,
              fontSize: 18,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
            }}
          >
            {options.map((option, index) => (
              <li
                key={option.value ?? `select_option_${index}`}
                className="px-3 py-2 cursor-pointer text-sm hover:bg-black/5 rounded"
                style={{
                  color: option.value ? fontColor1 : fontColor2,
                }}
                onMouseDown={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default Select;
