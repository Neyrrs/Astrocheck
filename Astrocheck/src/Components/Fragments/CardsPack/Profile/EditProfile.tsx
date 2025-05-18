"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ProfileImage } from "@/Components/Elements/Icons";
import SuccessButton from "@/Components/Elements/Buttons/SuccessButton";
import { useAllProfiles } from "@/Hooks/useProfile";

const EditProfile = () => {
  const { user } = useAllProfiles();
  const [imagePreview, setImagePreview] = useState(user?.profilePicture?.secure_url || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user?.profilePicture?.secure_url) {
      setImagePreview(user.profilePicture.secure_url);
    }
  }, [user]);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedImage(file); // Simpan file untuk dikirim saat submit
    }
  };

  const handleSubmit = async (e) => {
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
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal memperbarui profil",
        text: error.response?.data?.message || "Terjadi kesalahan",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-5 items-center">
        <div
          className="w-24 h-24 rounded-full overflow-hidden cursor-pointer border"
          onClick={handleImageClick}
          title="Klik untuk ganti gambar"
        >
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ProfileImage width={100} height={100} />
          )}
        </div>
        <div className="text-lg font-normal">
          <p>{user?.fullName || "Loading..."}</p>
          <p className="text-gray-500">
            {(user?.grade + " " + user?.idMajor?.major_name) ?? "Loading"}
          </p>
        </div>
      </div>

      {/* input file disembunyikan */}
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
