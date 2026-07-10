import { redirect } from "next/navigation";
import CopyPageContent from "./CopyPageContent";

interface CopyPageProps {
  searchParams: Promise<{
    code?: string;
  }>;
}

export default async function CopyPage({
  searchParams,
}: CopyPageProps) {
  const { code } = await searchParams;

  if (!code) {
    redirect("/");
  }

  return <CopyPageContent code={code} />;
}