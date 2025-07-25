"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { useItemContext } from "@/context/ItemContext";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  DangerButton,
  PrimaryButton,
  TertiaryButton,
} from "@/Components/Elements/Buttons";
import DisabledInputPack from "@/Components/Fragments/InputPack/DisabledInputPack";
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
import type { presenceHttpRequest } from "@/types/presence";

// TODO Buat major jadi ke supabase juga
// TODO Buat response APInya ada paginationnya
// !Hapus fetch dari hook yang sekiranya gak kepake dan cari solusi lain biar hooknya gak akan terpanggil terus ketika di salah satu page yang menggunakan salah saatunya
const CardEditPresence = () => {
  const { selectedItem } = useItemContext();
  const { setActiveContent } = useDashboardContext();

  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_guest: "",
      fullname: "",
      nis: "",
      date: "",
      time: "",
      reason: "",
      detail_reason: "",
      grade: "",
      major: "",
    },
  });

  useEffect(() => {
    const fetchPresenceDetail = async () => {
      if (!selectedItem?.id_guest) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const { data } = await axios.get(
          `${backendUrl}/presence/${selectedItem.id_guest}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        reset({
          id_guest: data.id_guest || "",
          fullname: data.fullname || "",
          nis: data.nis || "",
          date: data.date || "",
          time: data.time || "",
          reason: data.reason || "",
          detail_reason: data.detail_reason || "",
          grade: data.grade || "",
          major: data.major || "",
        });
      } catch (error) {
        console.error("Gagal mengambil detail presensi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPresenceDetail();
  }, [selectedItem, reset]);

  const onSubmit = async (formData: presenceHttpRequest) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      console.log("Form data: ", formData);
      await axios.put(
        `${backendUrl}/presence/${formData?.id_guest}`,
        {
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          detail_reason: formData.detail_reason,
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
        text: "Presensi berhasil diperbarui.",
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setActiveContent("Manajemen Presensi");
    } catch (error) {
      console.error("Gagal menyimpan data:", error);

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
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Data presensi ini akan dihapus!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        await axios.delete(`${backendUrl}/presence/${selectedItem.id_guest}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        Swal.fire({
          icon: "success",
          title: "Dihapus!",
          text: "Presensi berhasil dihapus.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        setActiveContent("Manajemen Presensi");
      } catch (error) {
        console.error("Gagal menghapus data:", error);

        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menghapus data.",
          toast: true,
          position: "top-end",
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    }
  };

  const handleCancel = () => {
    setActiveContent("Manajemen Presensi");
  };

  if (!selectedItem) return <p>Data tidak ditemukan</p>;
  if (isLoading)
    return <p className="text-gray-600">Memuat data presensi...</p>;

  const values = watch();

  return (
    <div className="h-fit">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">Edit Presensi {selectedItem.nis}</h2>
        <DangerButton padding="px-5 py-2" text="Hapus" onClick={handleDelete} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Data Personal
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 py-5">
            <div className="col-span-2 flex flex-row gap-4">
              <div className="w-1/2">
                <DisabledInputPack
                  text="ID"
                  {...register("id_guest", { required: "ID wajib diisi" })}
                  placeholder="ID"
                  value={values.id_guest}
                />
              </div>
              <div className="w-1/2">
                <DisabledInputPack
                  text="NIS"
                  {...register("nis", { required: "NIS wajib diisi" })}
                  placeholder="NIS"
                  value={values.nis}
                />
              </div>
            </div>

            <div className="col-span-2">
              <DisabledInputPack
                text="Nama Lengkap *"
                {...register("fullname", { required: "Nama wajib diisi" })}
                placeholder="Nama Lengkap"
                value={values.fullname}
              />
              {errors.fullname && (
                <p className="text-red-500 text-sm">
                  {errors.fullname.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <DropdownPackKelas
                {...register("grade", { required: "Kelas wajib diisi" })}
                placeholder="Kelas"
                value={values.grade}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue("grade", e.target.value)
                }
                disabled={true}
              />
            </div>

            <div>
              <DropdownPackJurusan
                {...register("major", { required: "Jurusan wajib diisi" })}
                placeholder="Jurusan"
                value={values.major}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setValue("major", e.target.value)
                }
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b-2 border-gray-300 font-semibold text-xl">
            Data Personal
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 py-5">
            <div className="col-span-2 flex flex-row gap-4">
              <div className="w-full">
                <Label text="Date *" />
                <Input
                  {...register("date", { required: "Date wajib diisi" })}
                  placeholder="Tanggal"
                  value={values.date}
                  onChange={(e) => setValue("date", e.target.value)}
                  type="date"
                />
              </div>
              <div className="w-full">
                <Label text="Time *" />
                <Input
                  {...register("time", { required: "Time wajib diisi" })}
                  onChange={(e) => setValue("time", e.target.value)}
                  placeholder="Wakt"
                  value={values.time}
                  type="text"
                />
              </div>
            </div>
            <div className="col-span-2">
              <DropdownPackAlasan
                id={"reason"}
                error={"Alasan harus diisi!"}
                name="reason"
                register={register}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                height="h-40"
                {...register("detail_reason")}
                placeholder="Detail Alasan"
                value={values.detail_reason}
                onChange={(e) => setValue("detail_reason", e.target.value)}
                {...(values.reason === "Lainnya" ? {} : { readOnly: true })}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <PrimaryButton fontSize="sm" text="Simpan Perubahan" />
          <TertiaryButton fontSize="sm" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default CardEditPresence;
