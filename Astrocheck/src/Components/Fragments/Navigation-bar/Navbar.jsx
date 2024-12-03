import profileIcons from "../../../assets/Icons/Profile.png"

const Navbar = () => {
  return (
    <div className="navbar-container w-full h-14 flex items-center text-white px-14 bg-[#5288CF] bg-opacity-50 backdrop-blur-md fixed top-0 left-0 text-lg z-50">
      <div className="navbar-left mr-auto">
        <p className="text-[1.4rem]">
          <a href="/">Astrocheck</a>
        </p>
      </div>
      <div className="navbar-right flex gap-10">
        <p className="cursor-pointer">Absen</p>
        <p className="cursor-pointer">Denah</p>
        <p className="cursor-pointer">FAQ</p>
        <p className="cursor-pointer">Grafik</p>
        <img src={profileIcons} className="cursor-pointer w-7 h-7" />
      </div>
    </div>
  );
};

export default Navbar;
