import ProfileView from "@/components/zoe/ProfileView";
import AuthGate from "@/components/zoe/AuthGate";

export default function ProfilePage() {
  return (
    <div className="zoe-root">
      <AuthGate>
        <ProfileView />
      </AuthGate>
    </div>
  );
}
