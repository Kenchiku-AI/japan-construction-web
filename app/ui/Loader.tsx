import { bgColor1 } from "@/lib/constants";

export const Loader = () => (
  <div
    style={{
      display: "flex",
      position: "absolute",
      justifyContent: "center",
      background: bgColor1,
      opacity: 0.7,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1000,
    }}
  >
    <span className="loading loading-spinner loading-xl"></span>
  </div>
);
