import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import DisabledToggleInput from "@/Components/Fragments/InputPack/DisabledToggleInput.jsx";
import DisabledInputPack from "@/Components/Fragments/InputPack/DisabledInputPack.jsx";
import { useAllProfiles } from "@/Hooks/useProfile.js";

const MyProfile = () => {
  const { user } = useAllProfiles();

  if (!user) {
    return <p>Loading...</p>;
  }
  console.log(user);

  const CardProfileInput = [
    [
      {
        id: 1,
        htmlFor: "namaLengkap",
        text: "Nama Lengkap",
        value: user?.fullName || "None",
      },
    ],
    [
      { id: 2, htmlFor: "NISN", text: "NISN", value: user.nisn || "None" },
      {
        id: 3,
        htmlFor: "password",
        text: "Password",
        value: user?.password || "Nons",
      },
    ],
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage width={100} height={100} className="rounded-full" />
        <div className="text-lg font-normal">
          <p>{user?.fullName}</p>
          <p className="text-gray-400">
            {user?.grade + " " + user?.idMajor?.major_name ||
              (user?.role != "admin" ? "None" : "Admin")}
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
