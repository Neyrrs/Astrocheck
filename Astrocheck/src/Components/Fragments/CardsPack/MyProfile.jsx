import React from "react";
import ProfileImage from "../../Elements/Icons/ProfileImage.jsx";
import DisabledInputPack from "../InputPack/DisabledInputPack.jsx";

const MyProfile = () => {
  const CardProfileInput = [
      {
        id: 1,
        htmlFor: "namaLengkap",
        text: "Nama Lengkap",
        placeholder: "Ezwan Ibnu Yassar",
      },
      {
        id: 2,
        htmlFor: "NISN",
        text: "NISN",
        placeholder: "0123456789",
      },
      {
        id: 3,
        htmlFor: "password",
        text: "Password",
        placeholder: "***********",
      },
      {
        id: 4,
        htmlFor: "namaTampilan",
        text: "Nama Tampilan",
        placeholder: "Ezwan",
      },
      {
        id: 5,
        htmlFor: "email",
        text: "Email",
        placeholder: "Ezwan@gmail.com",
      },
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-16" />
        <div className="text-base">
          <p>Ezwan Ibnu Yassar</p>
          <p className="text-slate-500">XI RPL 2</p>
        </div>
      </div>
      <div className="w-full mt-3 flex gap-20">
        <div className="">
          {CardProfileInput.map((attribute) => (
            <DisabledInputPack
              key={attribute.id}
              placeholder={attribute.placeholder}
              htmlFor={attribute.htmlFor}
              text={attribute.text}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyProfile;
