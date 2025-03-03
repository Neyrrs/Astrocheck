import { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import {ProfileImage} from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import useProfile from "@/Hooks/useProfile";

const EditProfile = () => {
  const { user } = useProfile();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      nickname: "",
      kelas: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname || "",
        email: user.email || "",
        kelas: user.kelas || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.put("http://localhost:3000/profile/update", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Profil berhasil diperbarui",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  const inputFields = [
    { name: "nickname", label: "Nama Tampilan", type: "text", placeholder: "Masukkan nama tampilan" },
    { name: "email", label: "Email", type: "email", placeholder: "Masukkan email" },
    { name: "password", label: "Password", type: "password", placeholder: "Masukkan password baru" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24" />
        <div className="text-lg">
          <p>{user?.fullName}</p>
          <input
            {...register("kelas")}
            className="text-slate-500 outline-none text-lg"
            type="text"
            placeholder="Tekan profil untuk edit"
          />
        </div>
      </div>

      <div className="w-full mt-5 flex flex-col">
        {inputFields.map((field, index) => (
          <div key={index} className="flex flex-col gap-2">
            <label className="w-full text-left">{field.label}</label>
            <input
              type={field.type}
              className="focus:border-[#6384E9] hover:border-[#6384E9] focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-full text-sm rounded-[5px] font-light"
              {...register(field.name)}
              placeholder={field.placeholder}
            />
          </div>
        ))}
      </div>

      <div className="mt-5">
        <SuccessButton text="Simpan" type="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
