"use client";

import { FC, ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { ApiProvider } from "./api/ApiContext";
import { ModalProvider } from "./modal/ModalContext";

const RootProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <ModalProvider>
      <ApiProvider>{children} </ApiProvider>
    </ModalProvider>
  </I18nextProvider>
);

export default RootProvider;
