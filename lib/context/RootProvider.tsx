import { FC, ReactNode } from "react";
import { AuthProvider } from "./auth/AuthContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n";

const providers = [AuthProvider];

interface ComposeProps {
  components: FC<{ children: ReactNode | ReactNode[] }>[];
  children: ReactNode;
}

const Compose = (props: ComposeProps) => {
  const { components = [], children } = props;
  return components.reduceRight((acc, C) => <C>{acc}</C>, children);
};

const RootProvider: FC<{ children: ReactNode }> = ({ children }) => (
  <I18nextProvider i18n={i18n}>
    <Compose components={providers}>{children}</Compose>
  </I18nextProvider>
);

export default RootProvider;
