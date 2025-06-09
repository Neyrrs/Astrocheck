"use client";
import { useDashboardContext } from "@/context/DashboardContext";
import ToggleSidebar from "@/Components/Fragments/Toggle/ToggleSidebar";
import DashBoard from "./DashBoard";
import ManajemenAkun from "./ManajemenAkun";
import CardEditPresence from "./CRUD/CardEditPresence";
import CardBuatPresensi from "./CRUD/CardBuatPresensi";
import { Home } from "@/assets/Icons/Index";
import Image from "next/image";

import ManajemenPresensi from "./ManajemenPresensi";
import ManajemenJurusan from "./ManajemenJurusan";
import CardBuatJurusan from "./CRUD/CardBuatJurusan";
import CardBuatAkun from "./CRUD/CardBuatAkun";
import CardEditJurusan from "./CRUD/CardEditJurusan";
import CardEditAkun from "./CRUD/CardEditAkun";
import GrafikPresensi from "./GrafikPresensi";

const CardAdminPanel = () => {
  const { activeContent, setActiveContent } = useDashboardContext();

  const renderContent = () => {
    switch (activeContent) {
      case "Dasbor": return <DashBoard />;
      case "Grafik Presensi": return <GrafikPresensi />;
      case "Manajemen Presensi": return <ManajemenPresensi />;
      case "Manajemen Akun": return <ManajemenAkun />;
      case "Manajemen Jurusan": return <ManajemenJurusan />;
      case "Edit Presensi": return <CardEditPresence />;
      case "Edit Akun": return <CardEditAkun />;
      case "Edit Jurusan": return <CardEditJurusan />;
      case "Buat Presensi": return <CardBuatPresensi />;
      case "Buat Jurusan": return <CardBuatJurusan />;
      case "Buat Akun": return <CardBuatAkun />;
      default: return null;
    }
  };

  return (
    <div>
      <div className="px-12 mt-14 bg-white flex items-center h-14 relative z-40">
        <ToggleSidebar setActiveContent={setActiveContent} />
        <div className="px-10 flex text-slate-500 h-[2rem] items-center gap-2">
          <Image width={30} height={30} src={Home} alt="Home" className="w-6 h-fit object-contain" />
          <p className="flex pt-2 items-center h-[40px]">
            {activeContent === "Dasbor" ? "/ Dasbor" : `/ Dasbor / ${activeContent}`}
          </p>
        </div>
      </div>
      <div className="dashboard-container h-auto flex-col gap-10 flex px-28 bg-[#f0f0f0] py-5">
        {renderContent()}
      </div>
    </div>
  );
};

export default CardAdminPanel;
