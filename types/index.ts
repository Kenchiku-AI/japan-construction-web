import { ReactNode } from "react";

export * from "./auth";
export * from "./reports";
export * from "./projects";
export * from "./companies";
export * from "./customInfo";

export type ModalContent = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
};

