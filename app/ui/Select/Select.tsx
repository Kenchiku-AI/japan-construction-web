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
import { useTranslation } from "react-i18next";

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
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const openUpwardRef = useRef(false);
  const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});
  const { t } = useTranslation();

  const selectedOption = useMemo(() => {
    return options.find((o) => o.value === value);
  }, [value, options]);

  const backgroundColor = useMemo(() => {
    if (error) return errorColor2;
    if (disabled) return bgColor3;
    return bgColor2;
  }, [error, disabled]);

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const maxHeight = Math.max(spaceBelow, spaceAbove) - 8;
      const openUpward = spaceBelow < 200 && spaceAbove > spaceBelow;

      openUpwardRef.current = openUpward;

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
    setOpen(false);
  };

  return (
    <div className="relative flex">
      <div className={styles.label} style={{ opacity: !value ? 0 : 1 }}>
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
          color: !value ? fontColor2 : fontColor1,
          paddingTop: !value ? undefined : 16,
          pointerEvents: disabled ? "none" : undefined,
          outlineColor: "var(--text-color-1)",
          borderTopLeftRadius: open && openUpwardRef.current ? 0 : undefined,
          borderTopRightRadius: open && openUpwardRef.current ? 0 : undefined,
          borderBottomLeftRadius: open && !openUpwardRef.current ? 0 : undefined,
          borderBottomRightRadius: open && !openUpwardRef.current ? 0 : undefined,
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
              borderTopLeftRadius: openUpwardRef.current ? undefined : 0,
              borderTopRightRadius: openUpwardRef.current ? undefined : 0,
              borderBottomLeftRadius: openUpwardRef.current ? 0 : undefined,
              borderBottomRightRadius: openUpwardRef.current ? 0 : undefined,
            }}
          >
            {!options.length ? (
              <li
                className="px-3 py-2 cursor-pointer text-sm rounded"
                style={{ color: fontColor2 }}
              >
                {t("no_options")}
              </li>
            ) : (
              <>
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
              </>
            )}
          </ul>,
          document.body,
        )}
    </div>
  );
};

export default Select;
