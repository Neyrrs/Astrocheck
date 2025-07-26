"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { PrimaryButton, TertiaryButton } from "@/Components/Elements/Buttons";
import Input from "@/Components/Elements/Inputs/Input";
import Label from "@/Components/Elements/Labels/Label";
import {
  DropdownPackJurusan,
  DropdownPackKelas,
} from "@/Components/Fragments/DropdownPack";
import { useDashboardContext } from "@/context/DashboardContext";
import axios from "axios";
import Swal from "sweetalert2";

const CardBuatAkun = () => {
  const { setActiveContent } = useDashboardContext();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    nis: "",
    fullname: "",
    grade: "",
    major: "",
    generation: 0,
    status: "Belum lulus",
    profile_picture: null,
    role: "",
    password: "",
  });

  const fileInputRef = useRef(null);

  const handleCancel = () => {
    setActiveContent("Manajemen Akun");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_picture_preview: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formdata ", formData);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const formPayload = new FormData();

      formPayload.append("nis", formData.nis);
      formPayload.append("fullname", formData.fullname);
      formPayload.append("grade", formData.grade);
      formPayload.append("major_name", formData.major);
      formPayload.append("generation", formData.generation);
      formPayload.append("status", formData.status);
      formPayload.append("role", formData.role);
      formPayload.append("password", formData.password);

      if (imageFile) {
        formPayload.append("profile_picture", imageFile);
      }

      for (let pair of formPayload.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      await axios.post(`${backendUrl}/user/register`, formPayload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Akun berhasil dibuat.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setActiveContent("Manajemen Akun");
    } catch (error) {
      console.error("Gagal membuat akun:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat membuat akun.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap">
        <h1 className="text-2xl font-bold">Buat Akun Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full gap-5">
            <div className="bg-white shadow-md rounded-xl w-full space-y-4">
              <div className="flex flex-col p-5  md:flex-row gap-4">
                <div className="w-full">
                  <Label text="NIS" />
                  <Input
                    placeholder="NIS"
                    name="nis"
                    value={formData.nis}
                    onChange={handleChange}
                  />
                </div>
                <div className="w-full">
                  <Label text="Role" />
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full border border-gray-300 text-sm rounded-md px-3 py-2"
                  >
                    <option value="">Role</option>
                    <option value="pustakawan">Pustakawan</option>
                    <option value="admin">Admin</option>
                    <option value="siswa">Siswa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl space-y-4 shadow-md">
              <div className=" px-5 py-3 font-semibold border-b-2 border-gray-300 text-xl">
                Personal Data
              </div>
              <div className="flex flex-col p-5 gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Label text="Nama Lengkap" />
                    <Input
                      placeholder="Nama Lengkap"
                      name="fullname"
                      value={formData.fullname}
                      onChange={handleChange}
                      autoComplete="false"
                    />
                  </div>
                  <div className="w-full">
                    <DropdownPackKelas
                      value={formData.grade}
                      disabled={false}
                      onChange={(e) =>
                        handleChange({
                          target: { name: "grade", value: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="w-full">
                  <DropdownPackJurusan
                    value={formData.major}
                    disabled={false}
                    onChange={(e) =>
                      handleChange({
                        target: { name: "major", value: e.target.value },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md">
              <Label text="Angkatan" />
              <Input
                placeholder="Angkatan"
                name="generation"
                type="number"
                value={formData.generation}
                onChange={handleChange}
              />
              <div className="gap-1 flex-col flex mt-2">
                <Label text="Status Sekolah" />
                <div className="flex gap-5 flex-wrap">
                  <label className="flex flex-1 items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="belum lulus"
                      checked={formData.status === "belum lulus"}
                      onChange={handleChange}
                    />
                    Belum lulus
                  </label>
                  <label className="flex flex-1 items-center gap-2">
                    <input
                      type="radio"
                      name="status"
                      value="lulus"
                      checked={formData.status === "lulus"}
                      onChange={handleChange}
                    />
                    Lulus
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow-md">
              <Label text="Profil" />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
              />
              <div
                className="cursor-pointer justify-center flex w-full rounded-md bg-black"
                onClick={handleImageClick}
                title="Klik untuk ganti foto"
              >
                {formData.profile_picture ? (
                  <Image
                    src={formData.profile_picture}
                    alt="Profile Picture"
                    width={120}
                    height={120}
                    className="rounded-lg shadow w-fit object-center"
                  />
                ) : (
                  <div className="w-[120px] h-[120px] flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 shadow">
                    Belum ada foto
                  </div>
                )}
              </div>
            </div>
            <div className="bg-white p-5 rounded-xl flex flex-col gap-2 shadow-md">
              <Label text="Password" />
              <Input
                value={formData.password}
                placeholder="Password"
                name="password"
                onChange={handleChange}
                type="password"
                autoComplete="false"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 w-full md:w-[300px] h-fit shadow-md">
            <Label text="Tanggal Pembuatan" />
            <Input
              label="Tanggal Pembuatan Akun"
              value={new Date().toISOString().split("T")[0]}
              type="date"
            />
          </div>
        </div>

        <div className="flex justify-between gap-3 mt-4 flex-wrap">
          <TertiaryButton fontSize="sm" text="Batal" onClick={handleCancel} />
          <PrimaryButton fontSize="sm" text="Simpan" />
        </div>
      </form>
    </>
  );
};

export default CardBuatAkun;
