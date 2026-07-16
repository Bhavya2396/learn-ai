import JourneyView from "@/components/zoe/JourneyView";
import AuthGate from "@/components/zoe/AuthGate";

export default async function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="zoe-root">
      <AuthGate>
        <JourneyView id={id} />
      </AuthGate>
    </div>
  );
}
