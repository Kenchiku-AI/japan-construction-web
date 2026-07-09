import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenchiku AI",
  description: "建設・建築業向けAIプラットフォーム「Kenchiku AI」。施工管理、現場報告、写真整理、書類作成を自動化し、建設業務を効率化。日本の建設会社・工務店・現場監督向け。",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
