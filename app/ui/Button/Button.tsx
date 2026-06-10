import { FC, useMemo, CSSProperties, useEffect, useState } from "react";
import styles from "./Button.module.css";
import { useIsMobile } from "@/lib/useIsMobile";

interface ButtonProps {
  label?: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  iconLeft?: FC;
  iconRight?: FC;
  iconOnlyMobile?: boolean;
  style?: CSSProperties;
  textStyle?: CSSProperties;
  loading?: boolean;
  handleEnter?: boolean;
}

export const Button: FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled,
  iconLeft,
  iconRight,
  iconOnlyMobile,
  style,
  textStyle,
  loading,
  handleEnter,
}) => {
  const { isMobile } = useIsMobile();
  const IconLeft = iconLeft;
  const IconRight = iconRight;

  const [containerStyle, labelStyle] = useMemo(() => {
    switch (variant) {
      case "secondary":
        return [styles.secondaryContainer, styles.secondaryLabel];
      case "tertiary":
        return [styles.tertiaryContainer, styles.tertiaryLabel];
      default:
        return [styles.primaryContainer, styles.primaryLabel];
    }
  }, [variant]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter" && handleEnter && !disabled && !loading) {
        onClick();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClick, disabled, loading, handleEnter]);

  const hideText = isMobile && iconOnlyMobile;

  return (
    <>
      <button
        onClick={onClick}
        disabled={disabled || loading}
        className={`btn ${containerStyle}`}
        style={{
          paddingLeft: variant === "tertiary" ? 0 : iconLeft ? 8 : 16,
          paddingRight: variant === "tertiary" ? 0 : iconRight ? 8 : 16,
          alignItems: "center",
          ...style,
        }}
      >
        {loading && (
          <span
            className={`loading loading-spinner absolute ${labelStyle}`}
          ></span>
        )}
        {IconLeft && (
          <div style={{ opacity: loading ? 0 : undefined }}>
            <IconLeft />
          </div>
        )}
        {label && !hideText && (
          <div
            className={labelStyle}
            style={{ opacity: loading ? 0 : undefined, ...textStyle }}
          >
            {label}
          </div>
        )}
        {IconRight && (
          <div style={{ opacity: loading ? 0 : undefined }}>
            <IconRight />
          </div>
        )}
      </button>
    </>
  );
};
