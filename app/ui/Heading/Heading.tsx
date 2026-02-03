import { CSSProperties, FC } from "react";
// import { fontColor1, fontColor2, fontFamily } from "../../constants";
import styles from "./Heading.module.css";

interface HeadingProps {
  title: string;
  subtitle?: string;
}

export const Heading: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div style={styles.container}>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
};
