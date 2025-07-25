import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import DisabledToggleInput from "@/Components/Fragments/InputPack/DisabledToggleInput";
import DisabledInputPack from "@/Components/Fragments/InputPack/DisabledInputPack";
import { useProfile } from "@/Hooks/useProfile";

const MyProfile = () => {
  const { data: user } = useProfile();

  if (!user) {
    return <p>Loading...</p>;
  }

  const CardProfileInput = [
    [
      {
        id: 1,
        htmlFor: "namaLengkap",
        text: "Nama Lengkap",
        value: user?.fullname || "None",
      },
    ],
    [
      { id: 2, htmlFor: "NISN", text: "NIS", value: user.nis || "None" },
    ],
  ];

  return (
    <>
      <div className="flex gap-5 items-center">
        <ProfileImage width={100} height={100} className="rounded-full" />
        <div className="text-lg font-normal">
          <p>{user?.fullname}</p>
          <p className="text-gray-400">
            {user?.grade + " " + user?.id_major?.major_name ||
              (user?.role != "admin" ? "None" : "Admin")}
          </p>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-3">
        {CardProfileInput[0].map((attribute) => (
          <DisabledInputPack
            key={attribute.id}
            value={attribute.value}
            text={attribute.text}
          />
        ))}
        {CardProfileInput[1].map((attribute) => (
          <DisabledToggleInput
            key={attribute.id}
            value={attribute.value}
            text={attribute.text}
          />
        ))}
      </div>
    </>
  );
};

export default MyProfile;
