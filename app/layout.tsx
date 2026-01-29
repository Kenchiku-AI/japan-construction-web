import { Kosugi_Maru } from "next/font/google";
import RootProvider from "./provider";
import "./globals.css";

const kosugi = Kosugi_Maru({ weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kosugi.className}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
