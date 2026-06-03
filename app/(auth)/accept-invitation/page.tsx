import { Suspense } from "react";
import AcceptInvitation from "./AcceptInvitation";

export default function Page() {
  return (
    <Suspense>
      <AcceptInvitation />
    </Suspense>
  );
}
