'use client'

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
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        nickname: user.nickname || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      await axios.put(`${backendUrl}/profile/update`, data, {
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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-5 items-center">
        <ProfileImage className="w-24 hover:w-25 duration-150 ease-in-out" />
        <div className="text-lg font-normal">
          <p>{user?.fullName}</p>
          <p className="text-gray-500">{user?.kelas}</p>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col">
          <div  className="flex flex-col gap-2 font-normal">
            <label className="w-full text-left">Password</label>
            <input
              type={'password'}
              className="focus:border-[#6384E9] hover:border-[#6384E9] border-gray-300 focus:shadow-md hover:shadow-md duration-150 ease-in outline-none border-[2px] px-3 mb-2 py-[1rem] h-[2rem] w-full text-sm rounded-[5px] font-normal"
              {...register('password')}
              placeholder={'Masukkan password baru'}
            />
          </div>
      </div>
      <div className="mt-2">
        <SuccessButton text="Simpan" type="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
