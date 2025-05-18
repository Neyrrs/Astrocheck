import Link from "next/link";
import { ProfileImage } from "@/Components/Elements/Icons";
import {
  KartuPerpustakaan,
  Keluar,
  RiwayatAbsen,
  Profile,
  AdminPanel,
} from "@/assets/Pictures/CardNavbar";
import Swal from "sweetalert2";
import {useAllProfiles} from "@/Hooks/useProfile";
import Image from "next/image";

const CardNavbar = () => {
  const { user } = useAllProfiles();
  const handleLogout = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Anda akan keluar dari akun ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Keluar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
        localStorage.removeItem("Token");
      }
    });
  };

  const listItemClass =
    "flex items-center py-1 px-2 w-full rounded-lg hover:bg-gradient-to-r hover:from-[#d0d2d896] hover:to-transparent duration-300 ease-in-out hover:translate-x-2 gap-2 cursor-pointer hover:text-black";
  if (!user) {
    return null;
  }
  return (
    <>
      <div className="absolute right-0 mt-14 bg-white rounded-md shadow-lg p-4 w-64 z-50">
        <Link href={{ pathname: "/profile", query: { show: 1 } }}>
          <div className="flex items-center gap-3 border-b border-[#d0d5dc] pb-3">
            <ProfileImage size="w-12 object-contain h-fit border-2 border-white rounded-full" />
            <div>
              <p className="text-black text-sm">{user.fullName}</p>
              <p className="text-sm text-gray-500">
                {(user.grade + " " + user?.idMajor?.major_name) || (user.role === "admin" && `Admin Astrocheck`)}
              </p>
            </div>
          </div>
        </Link>

        <ul className="mt-3 gap-2 flex-col flex text-[12px] text-black">
          <Link href={{ pathname: "/profile", query: { show: 2 } }}>
            <li className={listItemClass}>
              <Image
              width={25}
              height={25}
                src={Profile}
                className="w-6 h-6 object-contain"
                alt="Edit Profil"
              />
              Edit Profil
            </li>
          </Link>
          <Link href={{ pathname: "/profile", query: { show: 3 } }}>
            <li className={listItemClass}>
              <Image
              width={25}
              height={25}
                src={KartuPerpustakaan}
                className="w-6 h-6 object-contain"
                alt="Kartu Perpustakaan"
              />
              Kartu Perpustakaan
            </li>
          </Link>
          <Link href={"/history"}>
            <li className={listItemClass}>
              <Image
              width={25}
              height={25}
                src={RiwayatAbsen}
                className="w-6 h-6 object-contain"
                alt="Riwayat Absen"
              />
              Riwayat Absen
            </li>
          </Link>
          {user.role === "admin" && (
            <Link href={"/dashboard"}>
              <li className={listItemClass}>
                <Image
                width={25}
                height={25}
                  src={AdminPanel}
                  className="w-6 h-6 object-contain"
                  alt="Kartu Perpustakaan"
                />
                Admin Panel
              </li>
            </Link>
          )}
          <Link href={"#"} onClick={handleLogout}>
            <li className={listItemClass}>
              <Image
              width={25}
              height={25}
                src={Keluar}
                className="w-6 h-6 object-contain"
                alt="Keluar"
              />
              Keluar
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default CardNavbar;
