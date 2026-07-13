import JourneyView from "@/components/zoe/JourneyView";

export default async function JourneyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="zoe-root">
      <JourneyView id={id} />
    </div>
  );
}
