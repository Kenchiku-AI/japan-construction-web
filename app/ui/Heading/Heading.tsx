import { CSSProperties, FC } from "react";
// import { fontColor1, fontColor2, fontFamily } from "../../constants";
import styles from "./Heading.module.css";

interface HeadingProps {
  title: string;
  subtitle?: string;
  style?: CSSProperties;
}

export const Heading: FC<HeadingProps> = ({ title, subtitle, style }) => {
  return (
    <div style={styles.container}>
      <div className={styles.title}>{title}</div>
      {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
    </div>
  );
};

// const styles = StyleSheet.create({
//   title: {
//     fontFamily,
//     fontSize: 32,
//     color: fontColor1,
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontFamily,
//     fontSize: 14,
//     color: fontColor2,
//     lineHeight: 20,
//   },
// });
