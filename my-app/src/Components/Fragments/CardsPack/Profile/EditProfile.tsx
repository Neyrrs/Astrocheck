"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { ProfileImage } from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import { useAllProfiles } from "@/Hooks/useProfile";

const EditProfile = () => {
  const { user } = useAllProfiles();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.profilePicture?.secure_url) {
      setImagePreview(user.profilePicture.secure_url);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType = file.type.startsWith("image/");
    const isValidSize = file.size <= 2 * 1024 * 1024;

    if (!isValidType || !isValidSize) {
      Swal.fire({
        icon: "warning",
        title: "Gagal memuat gambar",
        text: "Pastikan file adalah gambar dan ukurannya tidak lebih dari 2MB",
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
    setSelectedImage(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user?._id) return;

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      const formData = new FormData();

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      await axios.put(
        `${backendUrl}/user/profilePicture/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Profil berhasil diperbarui",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil",
        text: err?.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 items-center">
        <div
          className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border-2 border-gray-500 relative"
          onClick={handleImageClick}
          title="Klik untuk ganti gambar"
        >
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Foto Profil"
              fill
              sizes="96px"
              className="object-cover rounded-full"
            />
          ) : (
            <ProfileImage width={96} height={96} />
          )}
        </div>

        <div className="text-lg font-normal">
          <p>{user?.fullName || "Memuat nama..."}</p>
          <p className="text-gray-500">
            {user?.idMajor?.major_name
              ? `${user.grade} ${user.idMajor.major_name}`
              : "Memuat jurusan..."}
          </p>
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        className="hidden"
      />

      <div className="mt-4">
        <SuccessButton text="Simpan" />
      </div>
    </form>
  );
};

export default EditProfile;
