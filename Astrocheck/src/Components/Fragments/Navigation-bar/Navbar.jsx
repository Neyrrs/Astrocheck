import { useState } from "react";
import { Link } from "react-scroll";
import {CardNavbar} from "../CardsPack";
import ProfileImage from "../../Elements/Icons/ProfileImage";

const Navbar = ({ homePage }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const navItems = ["Absen", "Denah", "FAQ", "Grafik"];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center bg-[#98bddf] bg-opacity-80 text-white px-14 text-lg z-50">
      {/* Logo */}
      <p className="text-xl">
        <a href="/">Astrocheck</a>
      </p>

      <div className="flex-1 flex justify-center gap-10 text-base">
        {navItems.map((item) =>
          homePage ? (
            <Link
              key={item}
              to={item}
              smooth={true}
              duration={100}
              offset={-80}
              className="cursor-pointer hover:opacity-80 transition duration-200"
            >
              {item}
            </Link>
          ) : (
            <a key={item} href="/" className="cursor-pointer hover:opacity-80 transition duration-200">
              {item}
            </a>
          )
        )}
      </div>

      <div className="flex gap-5 my-auto items-center relative">
        <button className="bg-white w-24 text-black rounded-md h-7 text-[10px]">
          Get App
        </button>
        <div className="relative flex items-center gap-20 flex-col">
          <button onClick={togglePopup}>
            <ProfileImage size="w-8 object-contain h-fit border-2 border-white" />
          </button>
          {isPopupVisible && <CardNavbar />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
