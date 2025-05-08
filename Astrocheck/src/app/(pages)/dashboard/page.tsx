import AuthGuard from "@/Components/AuthGuard/AuthGuard";
import CardAdminPanel from "@/Components/Fragments/DashBoardPack/Cards/CardAdminPanel";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import { DashboardProvider } from "@/context/DashboardContext";
import { ItemProvider } from "@/context/ItemContext";

const dashboard = () => {
  return (
    <AuthGuard>
      <DashboardProvider>
        <ItemProvider>
          <Navbar />
          <div>
            <CardAdminPanel />
          </div>
        </ItemProvider>
      </DashboardProvider>
    </AuthGuard>
  );
};

export default dashboard;
