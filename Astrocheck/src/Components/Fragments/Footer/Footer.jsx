import {OpenedBook} from "@/assets/Icons";

const Footer = () => {
  return (
    <>
      <div className="h-96 flex flex-col py-[4rem] px-20">
        <div className="h-12 flex items-center gap-5">
          <img src={OpenedBook} alt="" className="w-[3rem] h-fit object-contain" />
          <p className="text-[40px] font-light text-white">Astrolitera</p>
        </div>
        <div className="text-white text-[16px] font-light mt-10 flex flex-col gap-2 justify-center">
          <p>+123 456 7890</p>
          <p>astrolitera@gmail.com</p>
          <p>Jl. Astrolitera, SMKN 1 Cibinong</p>
        </div>
        <div className="text-white py-10 w-full border-b-2 border-white">
          <div className="flex font-light justify-between w-96">
            <p>Absen</p>
            <p>Denah</p>
            <p>FAQ</p>
            <p>Grafik</p>
            <p>Profil</p>
            <p>Riwayat</p>
          </div>
        </div>
        <p className="mt-10 text-white font-light text-base">© 2024 Astrolitera. Hak cipta dilindungi.</p>
      </div>
    </>
  );
};

export default Footer;
