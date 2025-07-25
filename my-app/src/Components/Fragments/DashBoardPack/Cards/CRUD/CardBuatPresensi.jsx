"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { PrimaryButton, TertiaryButton } from "@/Components/Elements/Buttons";
import Input from "@/Components/Elements/Inputs/Input";
import Label from "@/Components/Elements/Labels/Label";
import { TextArea } from "@/Components/Elements/Inputs";
import {
  DropdownPackAlasan,
  DropdownPackJurusan,
  DropdownPackKelas,
} from "@/Components/Fragments/DropdownPack";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const CardBuatPresensi = () => {
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
      nis: "",
      reason: "",
      detail_reason: "",
    },
  });

  const values = watch();

  const onSubmit = async (formData) => {
    try {
      setIsLoading(true);
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      const { nis, reason, detail_reason } = formData;

      await axios.post(
        `${backendUrl}/presence/`,
        { nis, reason, detail_reason },
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
      setActiveContent("Manajemen Presensi");
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
    setActiveContent("Manajemen Presensi");
  };

  return (
    <div className="h-fit">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">Buat Presensi Baru</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Personal Data
          </div>
          <div className="grid cols-2 gap-4 px-5 py-5">
            <div>
              <Label htmlFor="nis" text="NIS *" />
              <Input
                {...register("nis", { required: "NIS wajib diisi" })}
                placeholder="NIS"
                value={values.nis}
                onChange={(e) => setValue("nis", e.target.value)}
              />
              {errors.nis && (
                <p className="text-red-500 text-sm">{errors.nis.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Data Presensi
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 py-5">
            <div className="col-span-2 flex flex-row gap-4">
              <div className="w-full">
                <Label text="Tanggal" />
                <Input placeholder="Tanggal" type="date" />
              </div>
              <div className="w-full">
                <Label text="Jam" />
                <Input placeholder="Jam" type="text" />
              </div>
            </div>

            <div className="col-span-2">
              <DropdownPackAlasan
                register={register}
                name="reason"
                error={errors.reason}
            />
              {errors.reason && (
                <p className="text-red-500 text-sm">{errors.reason.message}</p>
              )}
            </div>

            <div className="col-span-2">
              <TextArea
                height="h-40"
                {...register("detail_reason", {
                })}
                placeholder="Detail Alasan"
                value={values.detail_reason}
                onChange={(e) => setValue("detail_reason", e.target.value)}
                readOnly={values.reason !== "Lainnya"}
              />
              {errors.detail_reason && (
                <p className="text-red-500 text-sm">
                  {errors.detail_reason.message}
                </p>
              )}
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

export default CardBuatPresensi;
