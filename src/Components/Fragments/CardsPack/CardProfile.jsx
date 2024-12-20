import React from "react";
import ProfileImage from "../../Elements/Icons/ProfileImage.jsx";
import InputPack from "../InputPack/InputPack.jsx";

const CardProfile = () => {
  return (
    <>
      <div className="bg-white rounded-xl w-[60rem] py-5 h-[28rem]">
        <div className="w-full border-b-2">
          <div className="px-10 flex text-lg h-9 gap-10">
            <p className="border-b-2 border-[#729CDA] border-spacing-y-10">
              My Profile
            </p>
            <p>Edit Profile</p>
            <p>Kartu Perpustakaan</p>
          </div>
        </div>
        <div className="mx-10 my-10">
          <div className="flex gap-5 items-center">
            <ProfileImage className="w-16" />
            <div className="text-base">
              <p>Ezwan Ibnu Yassar</p>
              <p className="text-slate-500">XI RPL 2</p>
            </div>
          </div>
          <div className="w-full">
            <div className="">
              <InputPack
                htmlFor="NISN"
                text="Nama Lengkap"
                type="text"
                name="NISN"
                placeholder="Contoh: 0123456789"
              />
            </div>
            <div className=""></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardProfile;
