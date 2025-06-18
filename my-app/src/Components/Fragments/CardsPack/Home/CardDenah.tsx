"use client";

import { useState } from "react";
import { RightArrow } from "@/assets/Icons/Index.js";
import {
  Denah,
  Lobby,
  RuangStaff,
  RuangStaffDetail,
  TempatDuduk,
  TempatMembaca,
  TempatMembacaBelakang,
  TempatPenyimpananBuku,
} from "@/assets/Pictures/Denah";
import Image from "next/image";

const CardDenah = () => {
  const images = [
    {
      name: "Denah",
      image: Denah,
    },
    {
      name: "Lobby",
      image: Lobby,
    },
    {
      name: "Tempat Duduk",
      image: TempatDuduk,
    },
    {
      name: "Ruang Staff",
      image: RuangStaff,
    },
    {
      name: "Tempat Membaca",
      image: TempatMembaca,
    },
    {
      name: "Tempat Membaca Belakang",
      image: TempatMembacaBelakang,
    },
    {
      name: "Tempat Penyimpanan Buku",
      image: TempatPenyimpananBuku,
    },
    {
      name: "Ruang Staff Detail",
      image: RuangStaffDetail,
    },
  ];
  // const [hovered, setHovered] = useState(false);
  // const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const [imageIndex, setImageIndex] = useState(0);

  const handleChange = (direction: string) => {
    if (direction === "next") {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    } else if (direction === "prev") {
      setImageIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1
      );
    }
    console.log("imageIndex", imageIndex);
  };

  return (
    <div className="p-5" id="Denah">
      <p className="text-xl text-center text-[#B4BCFF] my-5">
        {images[imageIndex].name}
      </p>
      <div className="flex gap-10 justify-center items-center">
        <button
          className="w-10 h-10 bg-white outline-none rounded-full shadow-md flex items-center justify-center"
          onClick={() => handleChange("prev")}
        >
          <Image
            width={20}
            height={20}
            src={RightArrow.src}
            className="w-5 h-5 rotate-180"
            alt="Left Arrow"
          />
        </button>
        <div
          // onMouseMove={(e) => {
          //   setCursorPos({ x: e.clientX, y: e.clientY });
          // }}
          // onMouseEnter={() => setHovered(true)}
          // onMouseLeave={() => setHovered(false)}
          className="bg-[#f0f4fd] py-10 px-10 w-[55rem] h-[30rem] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center"
        >
          <Image
            width={500}
            height={500}
            src={images[imageIndex].image}
            alt={`Denah ${imageIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {/* {hovered && (
            <HoverItem cursorPosX={cursorPos.x} cursorPosY={cursorPos.y} text={images[imageIndex].name}/>
          )} */}
        </div>
        <button
          className="w-10 h-10 bg-white outline-none rounded-full shadow-md flex items-center justify-center"
          onClick={() => handleChange("next")}
        >
          <Image
            src={RightArrow.src}
            width={20}
            height={20}
            alt="Right Arrow"
          />
        </button>
      </div>
    </div>
  );
};

export default CardDenah;

// const HoverItem = ({ cursorPosX = 0, cursorPosY = 0, text = "" }) => {
//   return (
//     <>
//       <div
//         style={{
//           position: "fixed",
//           top: cursorPosY - 50, 
//           left: cursorPosX + 10,
//           pointerEvents: "none", 
//           zIndex: 50,
//         }}
//         className={`bg-white shadow-lg text-black p-2 rounded-md border-2 border-black w-max`}
//       >
//         Ini adalah preview dari ruangan {text}
//       </div>
//     </>
//   );
// };
