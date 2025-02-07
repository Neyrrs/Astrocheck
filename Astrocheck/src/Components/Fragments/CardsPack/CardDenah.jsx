import React, { useState } from "react";
import RightArrow from "../../../Assets/Icons/RightArrow.png";
import Denah from "../../../Assets/Pictures/Denah/Denah.png";
import Lobby from "../../../Assets/Pictures/Denah/Lobby.png";
import TempatDuduk from "../../../Assets/Pictures/Denah/TempatDuduk.png";
import RuangStaff from "../../../Assets/Pictures/Denah/RuangStaff.png";
import TempatMembaca from "../../../Assets/Pictures/Denah/TempatMembaca.png";
import TempatMembacaBelakang from "../../../Assets/Pictures/Denah/TempatMembacaBelakang.png";
import TempatPenyimpananBuku from "../../../Assets/Pictures/Denah/TempatPenyimpananBuku.png";
import RuangStaffDetail from "../../../Assets/Pictures/Denah/RuangStaffDetail.png";

const CardDenah = () => {
  const images = [
    Denah,
    Lobby,
    TempatDuduk,
    RuangStaff,
    TempatMembaca,
    TempatMembacaBelakang,
    TempatPenyimpananBuku,
    RuangStaffDetail,
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
        Denah Perpustakaan
      </p>
      <div className="flex gap-10 justify-center items-center">
        <button
          className="w-10 h-10 bg-white outline-none rounded-full shadow-md flex items-center justify-center"
          onClick={() => handleChange("prev")}
        >
          <img
            src={RightArrow}
            className="w-5 h-5 rotate-180"
            alt="Left Arrow"
          />
        </button>
        <div className="bg-[#f0f4fd] py-10 px-10 w-[55rem] h-[30rem] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center">
          <img
            src={images[imageIndex]}
            alt={`Denah ${imageIndex + 1}`}
            className="w-full h-full object-contain"
          />
        </div>
        <button
          className="w-10 h-10 bg-white outline-none rounded-full shadow-md flex items-center justify-center"
          onClick={() => handleChange("next")}
        >
          <img src={RightArrow} className="w-5 h-5" alt="Right Arrow" />
        </button>
      </div>
    </div>
  );
};

export default CardDenah;
