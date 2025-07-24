"use client";

import { useState } from "react";
import Image from "next/image";
import {
  DangerButton,
  PrimaryButton,
  TertiaryButton,
} from "@/Components/Elements/Buttons";
import Input from "@/Components/Elements/Inputs/Input";
import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import Label from "@/Components/Elements/Labels/Label";
import {
  DropdownPackJurusan,
  DropdownPackKelas,
} from "@/Components/Fragments/DropdownPack";
import { useRef } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const CardEditAkun = () => {
  const { selectedItem: user } = useItemContext();
  const { setActiveContent } = useDashboardContext();
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    id_user: user?.id_user ?? "",
    nis: user?.nis ?? "",
    fullname: user?.fullname ?? "",
    grade: user?.grade ?? "",
    major: user?.major ?? "",
    generation: user?.generation ?? "",
    status: user?.status.toString().toLowerCase() ?? "belum lulus",
    profile_picture: user?.profile_picture?.secure_url ?? null,
    role: user?.role,
  });
  const fileInputRef = useRef(null);

  const handleCancel = () => {
    setActiveContent("Manajemen Akun");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          profile_picture: reader.result,
        }));
        setImageFile(file);
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

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const formPayload = new FormData();

      formPayload.append("id_user", formData.id_user);
      formPayload.append("nis", formData.nis);
      formPayload.append("fullname", formData.fullname);
      formPayload.append("grade", formData.grade);
      formPayload.append("major", formData.major);
      formPayload.append("generation", formData.generation);
      formPayload.append("status", formData.status);
      formPayload.append("role", formData.role);


      for (let pair of formPayload.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      if (imageFile) {
        formPayload.append("profile_picture", imageFile);
      }

      await axios.put(`${backendUrl}/user/${formData.id_user}`, formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("Token")}`,
        },
      });

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Akun berhasil diperbarui.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setActiveContent("Manajemen Akun");
    } catch (error) {
      console.error("Gagal memperbarui akun:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan data.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Jurusan ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (confirm.isConfirmed) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        await axios.delete(`${backendUrl}/major/${selectedItem.id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
        });

        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Jurusan berhasil dihapus.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        setActiveContent("Manajemen Jurusan");
      } catch (error) {
        console.error("Gagal menghapus jurusan:", error);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Tidak dapat menghapus jurusan.",
        });
      }
    }
  };

  return (
    <>
      <div className="flex justify-between items-center flex-wrap gap-3">
        <h1 className="text-2xl font-semibold">
          Edit Akun {formData?.id_user}
        </h1>
        <DangerButton type="button" text="Hapus" onClick={handleDelete} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col w-full gap-5">
            <div className="bg-white p-5 shadow-md rounded-xl w-full space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label text="ID" />
                  <Input
                    label="ID"
                    name="id_user"
                    value={formData.id_user}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="w-full">
                  <Label text="NIS" />
                  <Input
                    label="NIS"
                    name="nis"
                    value={formData.nis}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <Label text="Role" />
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                >
                  <option value="">Role</option>
                  <option value="pustakawan">Pustakawan</option>
                  <option value="admin">Admin</option>
                  <option value="siswa">Siswa</option>
                </select>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-md space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <Label text="Nama Lengkap" />
                  <Input
                    label="Nama Lengkap"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleChange}
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

              <div>
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

            <div className="bg-white p-5 rounded-xl shadow-md">
              <Label text="Angkatan" />
              <Input
                label="Angkatan"
                name="generation"
                value={formData.generation}
                onChange={handleChange}
              />
              <div className="gap-1 flex-col flex">
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
          </div>

          <div className="bg-white rounded-xl p-5 w-full md:w-[300px] h-fit shadow-md">
            <Label text="Tanggal Pembuatan" />
            <Input
              label="Tanggal Pembuatan Akun"
              name="date"
              value={new Date().toISOString().split("T")[0]}
              onChange={handleChange}
              type="date"
            />
          </div>
        </div>

        <div className="flex justify-start gap-3 mt-4 flex-wrap">
          <PrimaryButton fontSize="sm" text="Simpan Perubahan" />
          <TertiaryButton fontSize="sm" text="Batal" onClick={handleCancel} />
        </div>
      </form>
    </>
  );
};

export default CardEditAkun;
