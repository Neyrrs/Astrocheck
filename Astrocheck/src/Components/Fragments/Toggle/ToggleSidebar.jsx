import { useState } from "react";
import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import {ManajemenAbsen, ManajemenAkun, Dasbor, GrafikAbsensi} from "@/assets/Icons";
import useProfile from "@/Hooks/useProfile";
import { useAllPresence } from "@/Hooks/usePresence";

const ToggleSidebar = ({ setActiveContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useProfile();
  const {allPresences} = useAllPresence();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarContentStyle = [
    "hover:translate-x-2 duration-200 ease-out cursor-pointer flex items-center py-1 gap-4 bg-gradient-to-r h-fit rounded-md hover:from-[#E3EAFF] to-white",
    "w-4 h-4",
  ];

  return (
    <>
      <div className="shadow-2xl">
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white shadow-xl text-white transition-transform z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-[15rem]"
          } w-72`}
        >
          <div className="p-4 text-black flex-col flex gap-5 mb-auto">
            <div className="flex h-fit pb-4 gap-5 items-center border-b-2">
              <ProfileImage size="w-[4rem] h-[4rem]" />
              <div className="h-fit flex flex-col">
                <p className="text-sm text-black">{user?.fullName}</p>
                <p className="text-xs text-gray-500">Admin Astrocheck</p>
              </div>
            </div>
            <div className="px-3 flex-col flex gap-3">
              <h1 className="text-black font-semibold">Bilah sisi navigasi</h1>
              <ul className="space-y-2 border-b-2 pb-28">
                <li
                  className={sidebarContentStyle[0]}
                  onClick={() => setActiveContent("Dasbor")}
                >
                  <img
                    src={Dasbor}
                    alt="Dasbor"
                    className={sidebarContentStyle[1]}
                  />
                  <p className="text-sm">Dasbor</p>
                </li>
                <li
                  className={sidebarContentStyle[0]}
                  onClick={() => setActiveContent("Grafik Absensi")}
                >
                  <img
                    src={GrafikAbsensi}
                    alt="Grafik"
                    className={sidebarContentStyle[1]}
                  />
                  <p className="text-sm">Grafik Absensi</p>
                </li>
                <li
                  className={sidebarContentStyle[0]}
                  onClick={() => setActiveContent("Manajemen Absen")}
                >
                  <img
                    src={ManajemenAbsen}
                    alt="Manajemen Absen"
                    className={sidebarContentStyle[1]}
                  />
                  <p className="text-sm">Manajemen Absen</p>
                </li>
                <li
                  className={sidebarContentStyle[0]}
                  onClick={() => setActiveContent("Manajemen Akun")}
                >
                  <img
                    src={ManajemenAkun}
                    alt="Manajemen Akun"
                    className={sidebarContentStyle[1]}
                  />
                  <p className="text-sm">Manajemen Akun</p>
                </li>
              </ul>
              <div className="flex flex-col gap-2">
                <p className="text-black font-semibold">Baru-baru ini absen</p>
                {allPresences?.presence.slice(0, 5).map((latestPresence, index) => {
                  return (
                    <div key={index} className="flex gap-3 items-center">
                      <div className="flex gap-4">
                        <p className="text-sm w-32 truncate">{latestPresence.fullName}</p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {latestPresence.alasan}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className={`fixed top-[5rem] z-50 bg-gradient-to-r from-white to-[#81afe2] text-black p-2 w-10 h-10 rounded-[6px] transition-all ${
            isOpen ? "left-[17.5rem]" : "left-[2rem]"
          }`}
        ></button>
      </div>
    </>
  );
};

export default ToggleSidebar;
