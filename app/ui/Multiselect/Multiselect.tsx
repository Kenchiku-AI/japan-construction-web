import {
  bgColor2,
  bgColor3,
  buttonColor,
  errorColor2,
  fontColor1,
  fontColor2,
} from "@/lib/constants";
import { CSSProperties, FC, useEffect, useMemo, useRef, useState } from "react";
import styles from "./Multiselect.module.css";
import { createPortal } from "react-dom";
import { t } from "i18next";
import { Button } from "../Button/Button";
import { Edit } from "../Icons";

interface MultiselectOption {
  value?: string | number;
  label: string;
}

interface MultiselectProps {
  options: MultiselectOption[];
  values: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  error?: boolean;
  style?: CSSProperties;
  disabled?: boolean;
  onEdit?: (value: string) => void;
}

const Multiselect: FC<MultiselectProps> = ({
  options,
  values,
  onChange,
  placeholder,
  error,
  style,
  disabled,
  onEdit,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const openUpwardRef = useRef(false);
  const [dropdownStyles, setDropdownStyles] = useState<CSSProperties>({});

  const selectedOptions = useMemo(() => {
    return options.filter((option) =>
      option.value !== undefined &&
      values.includes(String(option.value))
    );
  }, [values, options]);

  const availableOptions = useMemo(() => {
    if (!!onEdit) return options;

    return options.filter(
      (option) =>
        option.value === undefined ||
        !values.includes(String(option.value)),
    );
  }, [values, options, onEdit]);

  const backgroundColor = useMemo(() => {
    if (error) return errorColor2;
    if (disabled) return bgColor3;
    return bgColor2;
  }, [error, disabled]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    updateDropdownPosition();

    const resizeObserver = new ResizeObserver(() => {
      updateDropdownPosition();
    });

    resizeObserver.observe(triggerRef.current);

    window.addEventListener("scroll", updateDropdownPosition, true);
    window.addEventListener("resize", updateDropdownPosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updateDropdownPosition, true);
      window.removeEventListener("resize", updateDropdownPosition);
    };
  }, [open]);

  const updateDropdownPosition = () => {
    if (!triggerRef.current) return;

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
  };

  const handleSelect = (option: MultiselectOption) => {
    if (disabled || option.value === undefined) return;

    const value = String(option.value);

    if (values.includes(value)) return;

    const newValues = [...values, value];

    onChange?.(newValues);

    if (newValues.length === options.length) {
      setOpen(false);
    }
  };

  const handleRemove = (value: string) => {
    if (disabled) return;

    onChange?.(values.filter((v) => v !== value));
  };

  const hasValues = values.length > 0;

  return (
    <div className="relative flex">
      <div className={styles.label} style={{ opacity: !hasValues ? 0 : 1 }}>
        {placeholder}
      </div>

      <div
        tabIndex={0}
        ref={triggerRef}
        className="select w-full cursor-pointer flex items-center focus:outline focus:outline-2 !h-auto"
        onClick={() => !disabled && setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        style={{
          backgroundColor,
          color: !hasValues ? fontColor2 : fontColor1,
          minHeight: 60,
          height: "auto",
          paddingTop: hasValues ? 20 : 0,
          paddingLeft: hasValues ? 8 : 16,
          pointerEvents: disabled ? "none" : undefined,
          outlineColor: "var(--text-color-1)",
          borderTopLeftRadius: open && openUpwardRef.current ? 0 : undefined,
          borderTopRightRadius: open && openUpwardRef.current ? 0 : undefined,
          borderBottomLeftRadius: open && !openUpwardRef.current ? 0 : undefined,
          borderBottomRightRadius: open && !openUpwardRef.current ? 0 : undefined,
          ...style,
        }}
      >
        <div className="flex flex-wrap items-center gap-2 w-full py-2">
          {selectedOptions.map((option) => {
            const value = String(option.value);

            return (
              <span
                key={value}
                className="inline-flex items-center gap-2 rounded-full pl-4 pr-3 py-2 text-sm"
                style={{
                  backgroundColor: "white",
                  color: fontColor1,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <div
                  className={!!onEdit ? "cursor-pointer hover:opacity-50" : ""}
                  onClick={(e) => {
                    // e.stopPropagation();
                    if (!disabled) {
                      onEdit?.(option.value as string);
                    }
                  }}
                // onMouseDown={(e) => {
                //   e.stopPropagation();
                //   e.preventDefault();
                // }}
                >
                  {option.label}
                </div>
                <button
                  type="button"
                  style={{ color: buttonColor }}
                  className="cursor-pointer leading-none hover:opacity-50"
                  // onMouseDown={(e) => {
                  //   e.stopPropagation();
                  //   e.preventDefault();
                  // }}
                  onClick={(e) => {
                    // e.stopPropagation();
                    handleRemove(value);
                  }}
                  aria-label={`Remove ${option.label}`}
                >
                  ×
                </button>
              </span>
            );
          })}

          {!hasValues && (
            <span style={{ color: fontColor2 }}>
              {placeholder}
            </span>
          )}
        </div>
      </div>

      {
        open &&
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
            {availableOptions.map((option, index) => {
              const isSelected = selectedOptions.some((o) => o.value === option.value);

              return (
                <div
                  key={option.value ?? `select_option_${index}`}
                  className="flex justify-between items-center"
                  onMouseDown={(e) => {
                    e.preventDefault();
                  }}
                >
                  <li
                    className={`px-3 py-2 text-sm rounded w-full ${isSelected ? "" : "cursor-pointer hover:bg-black/5"}`}
                    style={{
                      color: isSelected ? fontColor2 : (option.value ? fontColor1 : fontColor2),
                    }}
                    onMouseDown={(e) => {
                      handleSelect(option);
                    }}
                  >
                    {option.label}
                  </li>
                  {!!onEdit && (
                    <Button
                      style={{ paddingLeft: 10, paddingRight: 10 }}
                      variant="tertiary"
                      iconLeft={() => <Edit size={18} />}
                      onClick={() => {
                        onEdit(option.value as string);
                        setOpen(false);
                      }}
                    />
                  )}
                </div>
              );
            })}

            {availableOptions.length === 0 && (
              <li
                className="px-3 py-2 text-sm"
                style={{ color: fontColor2 }}
              >
                {t("no_options")}
              </li>
            )}
          </ul>,
          document.body,
        )
      }
    </div >
  );
};

export default Multiselect;