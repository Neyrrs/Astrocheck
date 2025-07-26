"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { PrimaryButton, TertiaryButton } from "@/Components/Elements/Buttons";
import Input from "@/Components/Elements/Inputs/Input";
import Label from "@/Components/Elements/Labels/Label";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import type { Major as FormData } from "@/types";

const CardBuatJurusan = () => {
  const { setActiveContent } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      major_code: "",
      major_name: "",
      major_fullname: "",
      duration: 0,
    },
  });

  const values = watch();

  const onSubmit = async (formData: FormData) => {
    try {
      setIsLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      await axios.post(
        `${backendUrl}/major/`,
        {
          major_code: formData.major_code.trim(),
          major_name: formData.major_name.trim(),
          major_fullname: formData.major_fullname.trim(),
          duration: formData.duration.toString().trim(),
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
        text: "Jurusan berhasil ditambahkan.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      reset();
      setActiveContent("Manajemen Jurusan");
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message ||
        "Terjadi kesalahan saat menyimpan jurusan.";
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: errorMsg,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setActiveContent("Manajemen Jurusan");
  };

  return (
    <div className="h-screen">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">Buat Jurusan Baru</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Data Jurusan
          </div>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            {/* Nama Lengkap Jurusan */}
            <div className="col-span-2">
              <Label htmlFor="major_fullname" text="Nama Lengkap Jurusan *" />
              <Input
                {...register("major_fullname", {
                  required: "Nama Jurusan wajib diisi",
                })}
                placeholder="Contoh: Rekayasa Perangkat Lunak"
              />
              {errors.major_fullname && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.major_fullname.message}
                </p>
              )}
            </div>

            {/* Singkatan Jurusan */}
            <div>
              <Label htmlFor="major_name" text="Singkatan Jurusan *" />
              <Input
                {...register("major_name", {
                  required: "Singkatan Jurusan wajib diisi",
                })}
                value={values.major_name.toUpperCase()}
                onChange={(e) =>
                  setValue("major_name", e.target.value.toUpperCase())
                }
                placeholder="Contoh: RPL"
              />
              {errors.major_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.major_name.message}
                </p>
              )}
            </div>

            {/* Kode Jurusan */}
            <div>
              <Label htmlFor="major_code" text="Kode Jurusan *" />
              <Input
                {...register("major_code", {
                  required: "Kode Jurusan wajib diisi",
                })}
                value={values.major_code}
                onChange={(e) => setValue("major_code", e.target.value)}
                placeholder="Contoh: 12RPL"
              />
              {errors.major_code && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.major_code.message}
                </p>
              )}
            </div>

            {/* Durasi */}
            <div className="col-span-2">
              <Label htmlFor="duration" text="Durasi (Tahun)" />
              <Input
                type="number"
                {...register("duration")}
                placeholder="Contoh: 3"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <TertiaryButton fontSize="sm" text="Batal" onClick={handleCancel} />
          <PrimaryButton
            fontSize="sm"
            text="Simpan"
            type="submit"
            disabled={isLoading}
          />
        </div>
      </form>
    </div>
  );
};

export default CardBuatJurusan;
