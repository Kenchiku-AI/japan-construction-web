import { FC, useMemo, CSSProperties } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  iconLeft?: FC;
  iconRight?: FC;
  style?: CSSProperties;
}

export const Button: FC<ButtonProps> = ({
  label,
  variant,
  onClick,
  disabled,
  iconLeft,
  iconRight,
  style,
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
      style={style}
    >
      {IconLeft && <IconLeft />}
      <div className={labelStyle}>{label}</div>
      {IconRight && <IconRight />}
    </button>
  );
};
