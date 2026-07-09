import Sidebar from "../ui/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenchiku AI",
  description: "建設・建築業向けAIプラットフォーム「Kenchiku AI」。施工管理、現場報告、写真整理、書類作成を自動化し、建設業務を効率化。日本の建設会社・工務店・現場監督向け。",
  openGraph: {
    title: "Kenchiku AI",
    description: "建設・建築業向けAIプラットフォーム「Kenchiku AI」。施工管理、現場報告、写真整理、書類作成を自動化し、建設業務を効率化。日本の建設会社・工務店・現場監督向け。",
    url: "https://kenchiku.ai",
    siteName: "Kenchiku AI",
    images: [
      {
        url: "https://kenchiku.ai/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kenchiku AI — 建設業向けAI報告書作成プラットフォーム",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kenchiku AI",
    description: "建設・建築業向けAIプラットフォーム「Kenchiku AI」。施工管理、現場報告、写真整理、書類作成を自動化し、建設業務を効率化。",
    images: ["https://kenchiku.ai/og-image.png"],
  },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
