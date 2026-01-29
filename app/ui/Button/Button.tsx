import { FC, useMemo } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled,
}) => {
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

  return (
    <button
      onClick={onClick}
      style={{
        opacity: disabled ? 0.5 : 1,
      }}
      disabled={disabled}
      className={`btn ${containerStyle}`}
    >
      <div className={labelStyle}>{label}</div>
    </button>
  );
};
