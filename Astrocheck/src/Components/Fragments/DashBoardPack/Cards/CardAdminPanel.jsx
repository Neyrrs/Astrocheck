import { useState } from "react";
import ToggleSidebar from "@/Components/Fragments/Toggle/ToggleSidebar";
import DashBoard from "./DashBoard";
import GrafikAbsen from "./GrafikAbsen";
import ManajemenAkun from "./ManajemenAkun";
import ManajemenAbsen from "./ManajemenAbsen";
import {Home} from "@/assets/Icons";

const CardAdminPanel = () => {
  const [activeContent, setActiveContent] = useState("Dasbor");

  const renderContent = () => {
    switch (activeContent) {
      case "Dasbor":
        return <DashBoard />;
      case "Grafik Absensi":
        return <GrafikAbsen />;
      case "Manajemen Absen":
        return <ManajemenAbsen />;
      case "Manajemen Akun":
        return <ManajemenAkun />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="px-12 mt-14 bg-white flex items-center h-14 relative z-40">
        <ToggleSidebar setActiveContent={setActiveContent} />
        <div className="px-10 flex text-slate-500 h-[2rem] items-center gap-2">
          <img src={Home} alt="Home" className=" w-6 h-fit object-contain" />
          <div className="">
            <p className="flex pt-2 items-center h-[40px]">
              {activeContent === "Dasbor"
                ? "/ Dasbor"
                : "/ Dasbor / " + activeContent + ""}
            </p>
          </div>
        </div>
      </div>
      <div className="dashboard-container h-auto flex-col gap-10 flex px-28 bg-[#f0f0f0] py-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default CardAdminPanel;
