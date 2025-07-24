"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import { ProfileImage } from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import { useProfile } from "@/Hooks/useProfile";

const EditProfile = () => {
  const { data: user, mutate } = useProfile();
  const [imagePreview, setImagePreview] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user?.profile_picture) {
      setImagePreview(user.profile_picture);
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
    console.log("Form submitted", { user, selectedImage });

    if (!user?.id_user || !selectedImage) {
      console.log("Missing data:", { userId: user?.id_user, hasImage: !!selectedImage });
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      const formData = new FormData();

      formData.append("profile_picture", selectedImage);

      console.log("Sending request to:", `${backendUrl}/user/${user.id_user}/profile-picture`);

      const response = await axios.put(
        `${backendUrl}/user/${user?.id_user}/profile-picture`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Response:", response.data);

      if (response.data.profile_picture) {
        await mutate({
          ...user,
          profile_picture: response.data.profile_picture,
        }, false);
      }

      Swal.fire({
        icon: "success",
        title: "Profil berhasil diperbarui",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error: unknown) {
      console.error("Upload error:", error);
      const err = error as { response?: { data?: { message?: string } } };
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil",
        text: err?.response?.data?.message || "Terjadi kesalahan.",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
          <p>{user?.fullname || "Memuat nama..."}</p>
          <p className="text-gray-500">
            {user?.major ? `${user.grade} ${user.major}` : "Memuat jurusan..."}
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
