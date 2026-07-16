import Home from "@/components/zoe/Home";
import AuthGate from "@/components/zoe/AuthGate";

export default function HomePage() {
  return (
    <div className="zoe-root">
      <AuthGate>
        <Home />
      </AuthGate>
    </div>
  );
}
