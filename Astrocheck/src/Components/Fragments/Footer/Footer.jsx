import React from "react";
import OpenedBook from "../../../Assets/Icons/OpenedBook.png";

const Footer = () => {
  return (
    <>
      <div className="h-96 pt-[6rem] px-20">
        <div className="h-fit flex items-center gap-8">
          <img src={OpenedBook} alt="" className="w-[4rem] object-contain" />{" "}
          <p className="text-4xl text-white">Astrolitera</p>
        </div>
        <div className="text-white  font-light mt-10 flex flex-col gap-2 justify-center">
          <p>+123 456 7890</p>
          <p>astrolitera@gmail.com</p>
          <p>Jl. Astrolitera, SMKN 1 Cibinong</p>
        </div>
        <div className="text-white mt-10 pb-10 w-full border-b-2 border-white">
          <div className="flex justify-between w-96">
            <p>Absen</p>
            <p>Denah</p>
            <p>FAQ</p>
            <p>Grafik</p>
            <p>Profil</p>
            <p>Riwayat</p>
          </div>
        </div>
        <p className="mt-5 text-white font-light text-sm">©2024 Astrolitera. Hak cipta dilindungi.</p>
      </div>
    </>
  );
};

export default Footer;
