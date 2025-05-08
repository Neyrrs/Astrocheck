"use client";

import { useDashboardContext } from "@/context/DashboardContext";
import { usePresenceContext } from "@/context/PresenceContext";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { DangerButton, PrimaryButton, TertiaryButton } from "@/Components/Elements/Buttons";
import DisabledInputPack from "../../InputPack/DisabledInputPack";
import Input from "@/Components/Elements/Inputs/Input";
import Label from "@/Components/Elements/Labels/Label";
import { TextArea } from "@/Components/Elements/Inputs";
import {
  DropdownPackAlasan,
  DropdownPackJurusan,
  DropdownPackKelas,
} from "../../DropdownPack";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // pastikan CSS untuk swal juga sudah diimport

const CardEditPresence = () => {
  const { selectedPresence } = usePresenceContext();
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
      id: "",
      fullName: "",
      nisn: "",
      date: "",
      time: "",
      reason: "",
      detailReason: "",
      grade: "",
      major: "",
    },
  });

  useEffect(() => {
    const fetchPresenceDetail = async () => {
      if (!selectedPresence?.id) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("Token");
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        const { data } = await axios.get(
          `${backendUrl}/presence/${selectedPresence.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        reset({
          id: data.id || "",
          fullName: data.fullName || "",
          nisn: data.nisn || "",
          date: data.date || "",
          time: data.time || "",
          reason: data.reason || "",
          detailReason: data.detailReason || "",
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
  }, [selectedPresence, reset]);

  const onSubmit = async (formData) => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      await axios.put(
        `${backendUrl}/presence/${formData.id}`,
        {
          date: formData.date,
          time: formData.time,
          reason: formData.reason,
          detailReason: formData.detailReason,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        }
      );

      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Presensi berhasil diperbarui.',
        toast: true,
        position: 'top-end',
        timer: 3000, 
        showConfirmButton: false,
        timerProgressBar: true,
      });

      setActiveContent("Manajemen Absen");

    } catch (error) {
      console.error("Gagal menyimpan data:", error);

      Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Terjadi kesalahan saat menyimpan data.',
        toast: true,
        position: 'top-end',
        timer: 3000,  
        showConfirmButton: false,
        timerProgressBar: true,
      });
    }
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Data presensi ini akan dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal',
    });

    if (result.isConfirmed) {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
        await axios.delete(`${backendUrl}/presence/${selectedPresence.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Token")}`,
          },
        });

        Swal.fire({
          icon: 'success',
          title: 'Dihapus!',
          text: 'Presensi berhasil dihapus.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });

        setActiveContent("Manajemen Absen");

      } catch (error) {
        console.error("Gagal menghapus data:", error);

        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: 'Terjadi kesalahan saat menghapus data.',
          toast: true,
          position: 'top-end',
          timer: 3000,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      }
    }
  };

  const handleCancel = () => {
    setActiveContent("Manajemen Absen");
  };

  if (!selectedPresence) return <p>Data tidak ditemukan</p>;
  if (isLoading)
    return <p className="text-gray-600">Memuat data presensi...</p>;

  const values = watch();

  return (
    <div className="h-fit">
      <div className="flex flex-row justify-between mb-6">
        <h2 className="text-2xl font-bold">
          Edit Presensi {selectedPresence.nisn}
        </h2>
        <DangerButton padding="px-5 py-2" text="Hapus" onClick={handleDelete}/>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b font-bold text-xl">
            Data Personal
          </div>
          <div className="grid grid-cols-2 gap-3 px-5 py-5">
            <div className="col-span-2 flex flex-row gap-4">
              <div className="w-1/2">
                <DisabledInputPack
                  text="ID"
                  {...register("id", { required: "ID wajib diisi" })}
                  placeholder="ID"
                  value={values.id}
                  readOnly
                />
              </div>
              <div className="w-1/2">
                <DisabledInputPack
                  text="NISN"
                  {...register("nisn", { required: "NISN wajib diisi" })}
                  placeholder="NISN"
                  value={values.nisn}
                  readOnly
                />
              </div>
            </div>

            <div className="col-span-2">
              <DisabledInputPack
                text="Nama Lengkap *"
                {...register("fullName", { required: "Nama wajib diisi" })}
                placeholder="Nama Lengkap"
                value={values.fullName}
                onChange={(e) => setValue("fullName", e.target.value)}
                readOnly
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div className="w-full">
              <DropdownPackKelas
                {...register("grade", { required: "Kelas wajib diisi" })}
                placeholder="Kelas"
                value={values.grade}
                onChange={(e) => setValue("grade", e.target.value)}
                disabled={true}
              />
            </div>

            <div>
              <DropdownPackJurusan
                {...register("major", { required: "Jurusan wajib diisi" })}
                placeholder="Jurusan"
                value={values.major}
                onChange={(e) => setValue("major", e.target.value)}
                disabled={true}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md">
          <div className="px-5 py-3 border-b font-bold text-xl">
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
                {...register("reason", { required: "Alasan wajib diisi" })}
                placeholder="Alasan"
                value={values.reason}
                onChange={(e) => setValue("reason", e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <TextArea
                height="h-40"
                {...register("detailReason", {
                  required: "Alasan wajib diisi",
                })}
                placeholder="Detail Alasan"
                value={values.detailReason}
                onChange={(e) => setValue("detailReason", e.target.value)}
                {...values.reason === "Lainnya" ? {} : { readOnly: true }}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-start gap-4">
          <PrimaryButton fontSize="sm" text="Simpan Perubahan" onClick={handleSubmit(onSubmit)}/>
          <TertiaryButton fontSize="sm" text="Cancel" onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
};

export default CardEditPresence;
