"use client";

import { useEffect, useRef, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ProfileImage } from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import { useAllProfiles } from "@/Hooks/useProfile";
import Image from "next/image";

const EditProfile: React.FC = () => {
  const { user } = useAllProfiles();
  const [imagePreview, setImagePreview] = useState<string>(user?.profilePicture?.secure_url || "");
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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImagePreview(reader.result);
        }
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      const formData = new FormData();

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
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
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil",
        text: error?.response?.data?.message || "Terjadi kesalahan",
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
              alt="Preview"
              fill
              className="object-cover"
              sizes="96px"
              style={{ borderRadius: "50%" }}
            />
          ) : (
            <ProfileImage width={100} height={100} />
          )}
        </div>
        <div className="text-lg font-normal">
          <p>{user?.fullName || "Loading..."}</p>
          <p className="text-gray-500">
            {user?.idMajor?.major_name
              ? `${user.grade} ${user.idMajor.major_name}`
              : "Loading..."}
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
        <SuccessButton text="Simpan" type="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
