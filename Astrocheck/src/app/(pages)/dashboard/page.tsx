import AuthGuard from "@/Components/AuthGuard/AuthGuard";
import CardAdminPanel from "@/Components/Fragments/DashBoardPack/Cards/CardAdminPanel";
import Navbar from "@/Components/Fragments/Navigation-bar/Navbar";
import React from "react";

const dashboard = () => {
  return (
    <AuthGuard>
      <Navbar />
      <div>
        <CardAdminPanel />
      </div>
    </AuthGuard>
  );
};

export default dashboard;
