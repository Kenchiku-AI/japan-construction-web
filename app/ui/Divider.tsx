import { FC } from "react";

interface DividerProps {
  color?: string;
}

const Divider: FC<DividerProps> = ({ color }) => {
  return (
    <div
      style={{
        height: 1,
        width: "100%",
        background: color ?? "black",
        margin: "16px 0",
      }}
    />
  );
};

export default Divider;
