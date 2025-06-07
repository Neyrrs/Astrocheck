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
import { DisabledInput } from "@/Components/Elements/Inputs";

const CardBuatJurusan = () => {
  const { setActiveContent } = useDashboardContext();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      major_code: "",
      major_name: "",
      majorFullName: "",
      duration: "",
    },
  });

  const values = watch();

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const { major_code, major_name, duration, majorFullName } = formData;

      await axios.post(
        `${backendUrl}/major/`,
        { major_code, major_name, duration, majorFullName},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Presensi berhasil ditambahkan.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      reset();
      setActiveContent("Manajemen Jurusan");
    } catch (error) {
      console.error("Gagal menambahkan presensi:", error);
      Swal.fire({
        icon: "error",
        title: "Gagal!",
        text: "Terjadi kesalahan saat menyimpan presensi.",
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
            Personal Data
          </div>
          <div className="grid grid-cols-2 gap-4 px-5 py-5">
            <div className="col-span-2">
              <Label htmlFor="major_name" text="Nama Jurusan *" />
              <DisabledInput placeholder="Nama Jurusan" />
              {errors.major_name && (
                <p className="text-red-500 text-sm">
                  {errors.major_name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="major_name" text="Nama Jurusan *" />
              <Input
                {...register("major_name", {
                  required: "Nama Jurusan wajib diisi",
                })}
                placeholder="Nama Jurusan"
                value={values.major_name}
                onChange={(e) => setValue("major_name", e.target.value)}
              />
              {errors.major_name && (
                <p className="text-red-500 text-sm">
                  {errors.major_name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="major_code" text="Kode Jurusan *" />
              <Input
                {...register("major_code", {
                  required: "Kode Jurusan wajib diisi",
                })}
                placeholder="Kode Jurusan"
                value={values.major_code}
                onChange={(e) => setValue("major_code", e.target.value)}
              />
              {errors.major_code && (
                <p className="text-red-500 text-sm">
                  {errors.major_code.message}
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

        <div className="flex justify-between gap-4">
          <TertiaryButton fontSize="sm" text="Batal" onClick={handleCancel} />
          <PrimaryButton
            fontSize="sm"
            text="Simpan"
            type="submit"
            isLoading={isLoading}
            onClick={onSubmit}
          />
        </div>
      </form>
    </div>
  );
};

export default CardBuatJurusan;
