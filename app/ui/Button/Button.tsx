import { FC, useMemo } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  iconLeft?: FC;
  iconRight?: FC;
}

export const Button: FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled,
  iconLeft,
  iconRight,
}) => {
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

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn ${containerStyle}`}
    >
      {IconLeft && <IconLeft />}
      <div className={labelStyle}>{label}</div>
      {IconRight && <IconRight />}
    </button>
  );
};
