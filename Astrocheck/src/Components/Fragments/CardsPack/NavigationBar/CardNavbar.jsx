import { Link } from "react-router";
import { ProfileImage } from "../../../Elements/Icons";
import {
  KartuPerpustakaan,
  Keluar,
  RiwayatAbsen,
  Profile,
} from "../../../../assets/Pictures/CardNavbar";
import Swal from "sweetalert2";
import useProfile from "../../../../Hooks/useProfile";

const CardNavbar = () => {
  const user = useProfile();
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
      <div className="absolute right-0 mt-16 bg-white rounded-md shadow-lg p-4 w-64 z-50">
        <div className="flex items-center gap-3 border-b pb-3">
          <ProfileImage size="w-12 object-contain h-fit border-2 border-white" />
          <div>
            <p className="text-black text-sm">{user.fullName}</p>
            <p className="text-sm text-gray-500">XI RPL 2</p>
          </div>
        </div>

        <ul className="mt-3 gap-2 flex-col flex text-[12px] text-black">
          <Link to="/profile-menu">
            <li className={listItemClass}>
              <img
                src={Profile}
                className="w-6 h-6 object-contain"
                alt="Edit Profil"
              />
              Edit Profil
            </li>
          </Link>
          <Link to="/profile-menu">
            <li className={listItemClass}>
              <img
                src={KartuPerpustakaan}
                className="w-6 h-6 object-contain"
                alt="Kartu Perpustakaan"
              />
              Kartu Perpustakaan
            </li>
          </Link>
          <Link to="/History">
            <li className={listItemClass}>
              <img
                src={RiwayatAbsen}
                className="w-6 h-6 object-contain"
                alt="Riwayat Absen"
              />
              Riwayat Absen
            </li>
          </Link>
          <Link to="#" onClick={handleLogout}>
            <li className={listItemClass}>
              <img
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
