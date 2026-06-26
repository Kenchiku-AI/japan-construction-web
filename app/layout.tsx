import { Noto_Sans_JP } from "next/font/google";
import RootProvider from "../lib/RootProvider";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light">
      <body className={notoSansJP.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
