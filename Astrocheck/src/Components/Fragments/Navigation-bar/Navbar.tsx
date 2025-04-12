'use client';

import { useState } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { useRouter } from 'next/navigation';
import {CardNavbar} from '@/Components/Fragments/CardsPack/Index';
import ProfileImage from '@/Components/Elements/Icons/ProfileImage';

interface NavbarProps {
  homePage?: boolean;
}

const Navbar = ({ homePage = false }: NavbarProps) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const router = useRouter();

  const togglePopup = () => setIsPopupVisible(!isPopupVisible);

  const handleNavigation = (item: { nav: string; route: string }) => {
    if (item.nav === 'Absen') {
      router.push('/absen');
    } else {
      router.push('/');
    }
  };

  const navItems = [
    { nav: 'Absen', route: '/absen' },
    { nav: 'Denah', route: 'Denah' },
    { nav: 'FAQ', route: 'FAQ' },
    { nav: 'Grafik', route: 'Grafik' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full h-16 flex items-center bg-[#98bddf] bg-opacity-80 text-white px-14 text-lg z-50">
      <p className="text-xl">
        <a href={"/"}>Astrocheck</a>
      </p>

      <div className="flex-1 flex justify-center gap-10 text-base">
        {navItems.map((item) =>
          item.nav === 'Absen' ? (
            <button
              key={item.nav}
              onClick={() => handleNavigation(item)}
              className="cursor-pointer hover:opacity-80 transition duration-200 bg-transparent border-none text-white"
            >
              {item.nav}
            </button>
          ) : homePage ? (
            <ScrollLink
              key={item.nav}
              to={item.route}
              smooth={true}
              duration={100}
              offset={-80}
              className="cursor-pointer hover:opacity-80 transition duration-200"
            >
              {item.nav}
            </ScrollLink>
          ) : (
            <button
              key={item.nav}
              onClick={() => router.push('/')}
              className="cursor-pointer hover:opacity-80 transition duration-200 bg-transparent border-none text-white"
            >
              {item.nav}
            </button>
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
