"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  PrimaryButton,
  TertiaryButton,
  DangerButton,
} from "@/Components/Elements/Buttons";
import Input from "@/Components/Elements/Inputs/Input";
import Label from "@/Components/Elements/Labels/Label";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import DisabledInput from "@/Components/Elements/Inputs/DisabledInput";

const CardEditJurusan = () => {
  const { selectedItem } = useItemContext();
  const { setActiveContent } = useDashboardContext();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      _id: "",
      major_code: "",
      major_name: "",
      majorFullName: "",
      duration: "",
    },
  });

  const values = watch();

  useEffect(() => {
    if (selectedItem?._id) {
      reset({
        _id: selectedItem._id || "",
        major_code: selectedItem.major_code || "",
        major_name: selectedItem.major_name || "",
        majorFullName: selectedItem.majorFullName || "",
        duration: selectedItem.duration || "",
      });
    }
  }, [selectedItem, reset]);

  const onSubmit = async (formData) => {
    const { major_code, major_name, majorFullName, _id, duration } = formData;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.put(
        `${backendUrl}/major/${_id}`,
        {
          major_code,
          major_name,
          majorFullName,
          duration,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Jurusan berhasil diperbarui.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setActiveContent("Manajemen Jurusan");
    } catch (error) {
      console.error("Gagal memperbarui jurusan:", error);
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

  const handleCancel = () => {
    setActiveContent("Manajemen Jurusan");
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
  console.log("Ini bukan useeffect: ", selectedItem);
  if (!selectedItem) return <p>Data tidak ditemukan</p>;

  return (
    <div className="h-screen">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">Edit Jurusan</h2>
        <DangerButton text="Hapus" onClick={handleDelete} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Data Jurusan
          </div>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            <div className="col-span-2">
              <Label htmlFor="id" text="ID" />
              <DisabledInput
                value={values?.major_code}
                onChange={(e) => setValue("major_code", e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="majorFullName" text="Nama Jurusan *" />
              <Input
                {...register("majorFullName", {
                  required: "Nama Jurusan wajib diisi",
                })}
                value={values?.majorFullName}
                onChange={(e) => setValue("majorFullName", e.target.value)}
                placeholder="Nama Jurusan"
              />
              {errors.majorFullName && (
                <p className="text-red-500 text-sm">
                  {errors.majorFullName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="major_name" text="Panggilan Jurusan *" />
              <Input
                {...register("major_name", {
                  required: "Nama panggilan Jurusan wajib diisi",
                })}
                value={values?.major_name}
                onChange={(e) => setValue("major_name", e.target.value)}
                placeholder="Panggilan Jurusan"
              />
              {errors.major_name && (
                <p className="text-red-500 text-sm">
                  {errors.major_name.message}
                </p>
              )}
            </div>
            <div className="col-span-2">
              <Label htmlFor="duration" text="Durasi" />
              <Input
                type="number"
                value={values?.duration}
                onChange={(e) => setValue("duration", e.target.value)}
                placeholder="Durasi Jurusan"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <PrimaryButton fontSize="sm" text="Simpan Perubahan" type="submit" />
          <TertiaryButton fontSize="sm" text="Batal" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default CardEditJurusan;
