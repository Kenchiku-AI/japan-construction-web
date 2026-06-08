import DocsSidebar from "./DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DocsSidebar>{children}</DocsSidebar>;
}
