"use client";

import { useEffect, useRef, useState } from "react";
// import { ProfileImageSquare } from "@/Components/Elements/Icons";
import { useProfile } from "@/Hooks/useProfile";
import { ProfileImage } from "@/Components/Elements/Icons";

const KartuPerpustakaan = () => {
  const [show, setShow] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  return (
    <div className="w-full h-fit flex flex-col items-center gap-4">
      <div
        className="cursor-pointer h-fit pb-4 w-130 bg-[#f5f5f5] border border-gray-300 rounded-lg"
        onClick={() => setShow(true)}
      >
        <Kartu />
      </div>

      <p className="font-normal text-center">Klik untuk memperbesar</p>

      {show && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
          <div
            ref={popupRef}
            className="bg-[#f5f5f5] border border-gray-400 rounded-lg shadow-lg p-4 w-[500px]"
          >
            <Kartu />
          </div>
        </div>
      )}
    </div>
  );
};

export default KartuPerpustakaan;

const Kartu = () => {
  const { data: user } = useProfile();
  return (
    <div>
      <div className="flex justify-center border-b border-[#A8A8A8] py-4">
        <p className="text-lg font-medium">
          Kartu Perpustakaan SMKN 1 Cibinong
        </p>
      </div>
      <div className="flex gap-5 justify-center mt-5">
        <ProfileImage
          width={150}
          height={150}
          className="rounded-sm object-cover"
        />
        <div>
          <p className="font-medium">Nama</p>
          <p className="font-normal">{user?.fullName}</p>
          <p className="font-medium">NIS</p>
          <p className="font-normal">{user?.nis}</p>
          <p className="font-medium">Kelas</p>
          <p className="font-normal">
            {user?.grade + " " + user?.idMajor?.major_name}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="bg-gray-300 h-8 mt-2 w-50"></div>
      </div>
      <div className="flex justify-center mt-5">
        <p className="text-sm font-normal">Copyright Easy Library</p>
      </div>
    </div>
  );
};
