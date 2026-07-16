import OnboardingFlow from "@/components/zoe/OnboardingFlow";
import AuthGate from "@/components/zoe/AuthGate";

export default function StartPage() {
  return (
    <div className="zoe-root">
      <AuthGate>
        <OnboardingFlow />
      </AuthGate>
    </div>
  );
}
