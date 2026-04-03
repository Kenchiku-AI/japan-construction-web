import { CSSProperties, FC } from "react";

interface DividerProps {
  color?: string;
  style?: CSSProperties;
}

const Divider: FC<DividerProps> = ({ color, style }) => {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: color ?? "black",
        margin: "12px 0",
        ...style,
      }}
    />
  );
};

export default Divider;
