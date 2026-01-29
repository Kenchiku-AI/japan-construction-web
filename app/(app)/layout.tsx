import Sidebar from "../ui/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <Sidebar>{children}</Sidebar>;
}
