import { FC } from "react";
import styles from "./Heading.module.css";

interface HeadingProps {
  title: string;
  subtitle?: string;
}

export const Heading: FC<HeadingProps> = ({ title, subtitle }) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
};
