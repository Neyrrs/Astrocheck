'use client';

import { useState, useEffect } from "react";
import {RightArrow} from "@/Assets/Icons/Index.js";
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
  
  const [imageIndex, setImageIndex] = useState(0);
  

  const handleChange = (direction) => {
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
        <div className="bg-[#f0f4fd] py-10 px-10 w-[55rem] h-[30rem] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
          <Image
            width={500}
            height={500}
            src={images[imageIndex].image}
            alt={`Denah ${imageIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
        <button
          className="w-10 h-10 bg-white outline-none rounded-full shadow-md flex items-center justify-center"
          onClick={() => handleChange("next")}
        >
          <img src={RightArrow.src} className="w-5 h-5" alt="Right Arrow" />
        </button>
      </div>
    </div>
  );
};

export default CardDenah;
