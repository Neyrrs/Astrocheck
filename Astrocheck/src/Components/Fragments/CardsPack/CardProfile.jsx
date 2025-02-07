import { useState } from "react";
import MyProfile from "./MyProfile";
import EditProfile from "./EditProfile";
import KartuPerpustakaan from "./KartuPerpustakaan";

const CardProfile = () => {
  const [show, setShow] = useState(0);
  const [active, setActive] = useState("");

  const handleShow = (e) => {
    setShow(Number(e.target.value));
    setActive(
      "border-b-2 border-[#729CDA] border-spacing-y-10 duration-300 ease-in-out"
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl w-[40rem] py-3 h-fit overflow-scroll">
        <div className="w-full border-b-2">
          <div className="px-10 flex text-base h-9 justify-center gap-20">
            <button
              value={1}
              onClick={handleShow}
              className={show === 1 ? active : ""}
            >
              My Profile
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
              Kartu Perpustakaan{" "}
            </button>
          </div>
        </div>

        <div className="mx-20 my-10">
          {(show === 1 && <MyProfile />) ||
            (show === 2 && <EditProfile />) ||
            (show === 3 && <KartuPerpustakaan />) || <MyProfile />}
        </div>
      </div>
    </>
  );
};

export default CardProfile;
