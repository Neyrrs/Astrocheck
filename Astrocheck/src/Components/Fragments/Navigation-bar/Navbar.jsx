import { useState } from "react";
import CardNavbar from "../CardsPack/CardNavbar";
import ProfileImage from "../../Elements/Icons/ProfileImage";

const Navbar = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <div className="navbar-container w-full h-14 flex items-center text-white px-14 bg-[#98bddf] backdrop-blur-md fixed top-0 left-0 text-lg z-50">
      <div className="">
        <p className="text-xl">
          <a href="/">Astrocheck</a>
        </p>
      </div>

      <div className="justify-center text-base w-full flex gap-10">
        <p className="cursor-pointer hover:opacity-80 duration-150">
          <a href={props.homePage ? "#Absen" : "/" || "/"}>Absen</a>
        </p>
        <p className="cursor-pointer hover:opacity-80 duration-150">
          <a href={props.homePage ? "#Denah" : "/" || "/"}>Denah</a>
        </p>
        <p className="cursor-pointer hover:opacity-80 duration-150">
          <a href={props.homePage ? "#FAQ" : "/" || "/"}>FAQ</a>
        </p>
        <p className="cursor-pointer hover:opacity-80 duration-150">
          <a href={props.homePage ? "#Grafik" : "/" || "/"}>Grafik</a>
        </p>
      </div>

      <div className="flex gap-5 my-auto items-center relative">
        <button className="bg-white w-28 text-black rounded-md h-7 text-[10px]">
          Get App
        </button>
        <div className="relative flex items-center gap-20 flex-col">
          <button onClick={togglePopup}>
            <ProfileImage size="w-10 object-contain h-fit border-2 border-white" />
          </button>
          {isPopupVisible && <CardNavbar />}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
