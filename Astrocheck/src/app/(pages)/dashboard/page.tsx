import AuthGuard from "@/Components/AuthGuard/AuthGuard";
import CardAdminPanel from "@/Components/Fragments/DashBoardPack/Cards/CardAdminPanel";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import { DashboardProvider } from "@/context/DashboardContext";
import { PresenceProvider } from "@/context/PresenceContext";

const dashboard = () => {
  return (
    <AuthGuard>
      <DashboardProvider>
        <PresenceProvider>
          <Navbar />
          <div>
            <CardAdminPanel />
          </div>
        </PresenceProvider>
      </DashboardProvider>
    </AuthGuard>
  );
};

export default dashboard;
