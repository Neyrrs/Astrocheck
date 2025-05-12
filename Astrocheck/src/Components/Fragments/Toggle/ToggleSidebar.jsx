import { useState } from "react";
import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import {
  ManajemenAbsen,
  ManajemenAkun,
  Dasbor,
  GrafikAbsensi,
} from "@/assets/Icons/Index";
import {useAllProfiles} from "@/Hooks/useProfile";
import Image from "next/image";

const ToggleSidebar = ({ setActiveContent }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAllProfiles();

  const sidebarContentStyle = [
    "hover:translate-x-2 duration-200 ease-out cursor-pointer flex items-center py-1 gap-4 bg-gradient-to-r h-fit rounded-md hover:from-[#E3EAFF] to-white px-3",
    "w-4 h-4",
  ];

  return (
    <>
      <div
        className="shadow-2xl"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <div
          className={`fixed top-14 left-0 h-[calc(100vh-3.5rem)] bg-white shadow-xl text-white transition-transform z-50 ${
            isOpen ? "translate-x-0" : "-translate-x-[15rem]"
          } w-72`}
        >
          <div className="p-4 text-black flex-col flex gap-5 mb-auto">
            <div className="flex h-fit pb-4 gap-5 items-center border-b-2 border-gray-300">
              <ProfileImage size="w-[4rem] h-[4rem]" />
              <div className="h-fit flex flex-col">
                <p className="text-sm text-black">{user?.fullName}</p>
                <p className="text-xs text-gray-500">Admin Astrocheck</p>
              </div>
            </div>
            <div className="px-2 flex-col flex gap-3">
              <h1 className="text-black font-semibold">Bilah sisi navigasi</h1>
              <ul className="gap-2 flex flex-col border-gray-300 pb-28">
                <ul className="w-full h-fit py-2 gap-2 flex flex-col border-b-2 border-gray-300">
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Dasbor")}
                  >
                    <Image
                      width={30}
                      height={30}
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
                    <Image
                      width={30}
                      height={30}
                      src={GrafikAbsensi}
                      alt="Grafik"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Grafik Presensi</p>
                  </li>
                </ul>

                <ul className="w-full h-fit py-2 gap-2 flex flex-col border-b-2 border-gray-300">
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Manajemen Akun")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAkun}
                      alt="Manajemen Absen"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Manajemen Akun</p>
                  </li>
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Manajemen Presensi")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAkun}
                      alt="Manajemen Presensi"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Manajemen Presensi</p>
                  </li>
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Manajemen Jurusan")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAbsen}
                      alt="Manajemen Jurusan"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Manajemen Jurusan</p>
                  </li>
                </ul>
                <ul className="w-full h-fit py-2 gap-2 flex flex-col border-gray-300">
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Buat Akun")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAkun}
                      alt="Buat Absen"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Buat Akun</p>
                  </li>
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Buat Presensi")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAkun}
                      alt="Buat Presensi"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Buat Presensi</p>
                  </li>
                  <li
                    className={sidebarContentStyle[0]}
                    onClick={() => setActiveContent("Buat Jurusan")}
                  >
                    <Image
                      width={30}
                      height={30}
                      src={ManajemenAbsen}
                      alt="Buat Jurusan"
                      className={sidebarContentStyle[1]}
                    />
                    <p className="text-sm">Buat Jurusan</p>
                  </li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToggleSidebar;
