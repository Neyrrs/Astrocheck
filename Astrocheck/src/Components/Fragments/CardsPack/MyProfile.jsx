import ProfileImage from "../../Elements/Icons/ProfileImage.jsx";
import DisabledInputPack from "../InputPack/DisabledInputPack.jsx";
import useProfile from "../../../Hooks/useProfile.js"

const MyProfile = () => {
  const user = useProfile();
  console.log(user.data);
  
  const CardProfileInput = [
    {
      id: 1,
      htmlFor: "namaLengkap",
      text: "Nama Lengkap",
      placeholder: "Ezwan Ibnu Yassar",
    },
    {
      id: 2,
      htmlFor: "namaTampilan",
      text: "Nama Tampilan",
      placeholder: "Ezwan",
    },
    {
      id: 3,
      htmlFor: "email",
      text: "Email",
      placeholder: "Ezwan@gmail.com",
    },
    {
      id: 4,
      htmlFor: "NISN",
      text: "NISN",
      placeholder: "0123456789",
    },
    {
      id: 5,
      htmlFor: "password",
      text: "Password",
      placeholder: "***********",
    },
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24" />
        <div className="text-lg">
          <p>Ezwan Ibnu Yassar</p>
          <p className="text-slate-500">XI RPL 2</p>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-3">
        {CardProfileInput.map((attribute) => (
          <DisabledInputPack
            key={attribute.id}
            placeholder={attribute.placeholder}
            htmlFor={attribute.htmlFor}
            text={attribute.text}
          />
        ))}
      </div>
    </>
  );
};

export default MyProfile;
