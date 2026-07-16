import { Suspense } from "react";
import Login from "@/components/zoe/Login";

export default function LoginPage() {
  return (
    <div className="zoe-root">
      <Suspense fallback={null}>
        <Login />
      </Suspense>
    </div>
  );
}
