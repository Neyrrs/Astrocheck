'use client';

import { useEffect, useState } from "react";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import KartuPerpustakaan from "./KartuPerpustakaan";
import { useSearchParams } from "next/navigation";

const CardProfile = () => {
  const searchParams = useSearchParams();
  const showQuery = searchParams.get('show');
  const [show, setShow] = useState(1);
  const [active, setActive] = useState("");

  useEffect(() => {
    if (showQuery) {
      setShow(Number(showQuery));
    }
  }, [showQuery]);

  const handleShow = (e) => {
    setShow(Number(e.target.value));
    setActive(
      "border-b-2 border-[#729CDA] border-spacing-y-10 duration-300 ease-in-out"
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl w-fit py-3 h-fit overflow-scroll font-semibold">
        <div className="w-full px-24 border-b-2 border-gray-300">
          <div className="flex w-full text-lg h-14 justify-center gap-14">
            <button
              value={1}
              onClick={handleShow}
              className={show === 1 ? active : ""}
            >
              Profil Saya
            </button>
            <button
              value={2}
              onClick={handleShow}
              className={show === 2 ? active : ""}
            >
              Edit Profile
            </button>
            <button
              value={3}
              onClick={handleShow}
              className={show === 3 ? active : ""}
            >
              Kartu Perpustakaan
            </button>
          </div>
        </div>

        <div className="mx-24 my-12">
          {(show === 1 && <MyProfile />) ||
            (show === 2 && <EditProfile />) ||
            (show === 3 && <KartuPerpustakaan />) || <MyProfile />}
        </div>
      </div>
    </>
  );
};

export default CardProfile;
