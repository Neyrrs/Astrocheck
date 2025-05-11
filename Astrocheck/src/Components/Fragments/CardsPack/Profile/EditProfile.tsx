"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ProfileImage } from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import useProfile from "@/Hooks/useProfile";
import { Input } from "@/Components/Elements/Inputs";

const EditProfile = () => {
  const { user } = useProfile();
  const [imagePreview, setImagePreview] = useState(
    user?.profilePicture?.secure_url || ""
  );
  const { register, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      nickname: user?.nickname || "",
      email: user?.email || "",
      password: "",
      profilePicture: "",
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setValue("profilePicture", file);
    }
  };

  const onSubmit = async (data) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      const formData = new FormData();
      formData.append("password", data.password);
      if (data.profilePicture) {
        formData.append("profilePicture", data.profilePicture);
      }

      await axios.put(`${backendUrl}/user/${user?._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <ProfileImage width={100} height={100} />
        </div>
        <div className="text-lg font-normal">
          <p>{user?.fullName}</p>
          <p className="text-gray-500">
            {user?.grade + " " + user?.idMajor?.major_name}
          </p>
        </div>
      </div>

      <div className="w-full mt-5 flex flex-col font-normal">
        <label className="w-full text-left">Password</label>
        <Input
          type="password"
          {...register("password")}
          placeholder="Masukkan password baru"
        />
      </div>

      <div className="w-full mt-2 flex flex-col font-normal">
        <label className="w-full text-left">Gambar Profil</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          placeholder="Select image"
          required={false}
        />
      </div>

      <div className="mt-2">
        <SuccessButton text="Simpan" type="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
