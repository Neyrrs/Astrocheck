import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import DisabledToggleInput from "@/Components/Fragments/InputPack/DisabledToggleInput.jsx";
import DisabledInputPack from "@/Components/Fragments/InputPack/DisabledInputPack.jsx";
import useProfile from "@/Hooks/useProfile.js";

const MyProfile = () => {
  const { user } = useProfile();

  if (!user) {
    return <p>Loading...</p>;
  }

  const CardProfileInput = [
    [
      {
        id: 1,
        htmlFor: "namaLengkap",
        text: "Nama Lengkap",
        value: user.fullName || "None",
      },
      {
        id: 2,
        htmlFor: "namaTampilan",
        text: "Nama Tampilan",
        value: user.nickname || "None",
      },
    ],
    [
      {
        id: 3,
        htmlFor: "email",
        text: "Email",
        value: user.email || "Nons",
      },
      { id: 4, htmlFor: "NISN", text: "NISN", value: user.nisn || "None" },
    ],
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24" />
        <div className="text-lg">
          <p>{user.fullName}</p>
          <p className="text-slate-500">
            {user.kelas + " " + user.jurusan ||
              (user.role != "admin" ? "None" : "Admin")}
          </p>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-3">
        {CardProfileInput[0].map((attribute) => (
          <DisabledInputPack
            key={attribute.id}
            value={attribute.value}
            htmlFor={attribute.htmlFor}
            text={attribute.text}
          />
        ))}
        {CardProfileInput[1].map((attribute) => (
          <DisabledToggleInput
            key={attribute.id}
            value={attribute.value}
            htmlFor={attribute.htmlFor}
            text={attribute.text}
          />
        ))}
      </div>
    </>
  );
};

export default MyProfile;
