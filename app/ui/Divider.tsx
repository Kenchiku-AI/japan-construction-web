import { bgColor2 } from "@/lib/constants";
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
        background: color ?? "#f1f1f3",
        margin: "10px 0",
        ...style,
      }}
    />
  );
};

export default Divider;
