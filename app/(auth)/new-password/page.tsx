import { Suspense } from "react";
import NewPassword from "./NewPassword";

export default function Page() {
  return (
    <Suspense>
      <NewPassword />
    </Suspense>
  );
}
