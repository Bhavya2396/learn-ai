import AskZoe from "@/components/zoe/AskZoe";
import AuthGate from "@/components/zoe/AuthGate";

export default async function AskPage({ searchParams }: { searchParams: Promise<{ listen?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="zoe-root">
      <AuthGate>
        <AskZoe autoListen={sp?.listen === "1"} />
      </AuthGate>
    </div>
  );
}
