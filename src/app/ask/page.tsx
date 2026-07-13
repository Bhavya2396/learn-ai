import AskZoe from "@/components/zoe/AskZoe";

export default async function AskPage({ searchParams }: { searchParams: Promise<{ listen?: string }> }) {
  const sp = await searchParams;
  return (
    <div className="zoe-root">
      <AskZoe autoListen={sp?.listen === "1"} />
    </div>
  );
}
