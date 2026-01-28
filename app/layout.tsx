import { Kosugi_Maru } from "next/font/google";
import Sidebar from "./ui/Sidebar";
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
        <RootProvider>
          <Sidebar>{children}</Sidebar>
        </RootProvider>
      </body>
    </html>
  );
}
