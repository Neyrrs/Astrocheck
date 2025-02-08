import ProfileImage from "../../Elements/Icons/ProfileImage";
import DisabledInputPack from "../InputPack/DisabledInputPack";
import SuccessButton from "../../Elements/Buttons/SuccessButton";

const EditProfile = () => {
  const CardProfileInput = [
    {
      id: 1,
      htmlFor: "namaTampilan",
      text: "Nama Tampilan",
      placeholder: "Ezwan",
    },
    {
      id: 2,
      htmlFor: "email",
      text: "Email",
      placeholder: "ezwan@gmail.com",
    },
    {
      id: 3,
      htmlFor: "password",
      text: "Password",
      placeholder: "**********",
    },
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24" />
        <div className="text-lg">
          <p>Ezwan Ibnu Yassar</p>
          <input
            className="text-slate-500 outline-none text-lg"
            type="input"
            placeholder="Tekan profil untuk edit"
          />
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
      <div className="mt-5">
        <SuccessButton text="Simpan" />
      </div>
    </>
  );
};

export default EditProfile;
