import { redirect } from "next/navigation";

export default function DocsCatchAllPage() {
  redirect("/docs/quick-start");
}