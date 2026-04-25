import { Suspense } from "react";
import ResetPassword from "./ResetPassword";

export default function Page() {
  return (
    <Suspense>
      <ResetPassword />
    </Suspense>
  );
}
