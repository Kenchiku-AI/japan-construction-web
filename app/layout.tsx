import "./globals.css";
import { Kosugi_Maru } from "next/font/google";
import Sidebar from "./ui/Sidebar";

const kosugi = Kosugi_Maru({ weight: "400" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={kosugi.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
