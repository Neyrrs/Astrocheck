import Profile from "../../Elements/Icons/Profile";

const Navbar = () => {
  return (
    <div className="navbar-container w-full h-14 flex items-center text-white px-14 bg-[#5288CF] bg-opacity-50 backdrop-blur-md fixed top-0 left-0 text-lg z-50">
      <div className="navbar-left">
        <p className="text-xl">
          <a href="/">Astrocheck</a>
        </p>
      </div>
      <div className="navbar-right justify-center text-base w-full flex gap-10">
        <p className="cursor-pointer">Absen</p>
        <p className="cursor-pointer">Denah</p>
        <p className="cursor-pointer">FAQ</p>
        <p className="cursor-pointer">Grafik</p>
        <p className="cursor-pointer">Get App</p>
      </div>
      <div className="flex gap-5">
        <button className="bg-white w-28 text-black rounded-md h-7 text-[10px]">Get App</button>
        <Profile />
      </div>
    </div>
  );
};

export default Navbar;
