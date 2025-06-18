"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { DisabledInput, TextArea } from "@/Components/Elements/Inputs";
import { DangerButton, SuccessButton } from "@/Components/Elements/Buttons";
import {
  DropdownPackKelas,
  DropdownPackAlasan,
  DropdownPackJurusan,
} from "@/Components/Fragments/DropdownPack";
import Swal from "sweetalert2";
import axios from "axios";
import { useAllProfiles } from "@/Hooks/useProfile";

const showToast = (icon, title, onClose = () => {}) => {
  let clicked = false;

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("click", () => {
        clicked = true;
        Swal.stopTimer();
        Swal.close();
      });
    },
  });

  Toast.fire({ icon, title }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer && !clicked) {
      onClose();
    }
  });
};

const FormAbsence = () => {
  const { user } = useAllProfiles();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (user) {
      setValue("nis", user.nis || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    if (!data.reason) {
      showToast("error", "Alasan tidak boleh kosong!");
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");

      await axios.post(
        `${backendUrl}/presence`,
        {
          reason: data.reason,
          detailReason: data.detailReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", "Absen berhasil, form akan otomatis di-reset");

      reset({
        nis: user?.nis || "",
        reason: "",
        detailReason: "",
      });
    } catch (error) {
      showToast("error", error?.response?.data?.message || "Gagal mengirim data");
    }
  };

  return (
    <div className="bg-[#f9f9f9] rounded-xl w-[40rem] shadow-2xl py-10 mt-5 h-fit overflow-scroll">
      <div className="px-10 pb-10 text-base text-center border-b-2 border-gray-300">
        <p className="text-3xl font-medium">Form Absen</p>
        <p className="text-xl">Astrolitera</p>
      </div>

      <div className="my-10 px-24">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label htmlFor="nis" className="text-sm">NIS</label>
            <DisabledInput
              type="number"
              value={user?.nis || ""}
              disabled
              {...register("nis")}
            />
          </div>

          <div>
            <label htmlFor="fullName" className="text-sm">Nama</label>
            <DisabledInput
              type="text"
              value={user?.fullName || ""}
              disabled
            />
          </div>

          <DropdownPackKelas
            name="kelas"
            value={user?.grade || ""}
            disabled
          />

          <DropdownPackJurusan
            name="jurusan"
            value={user?.idMajor?.major_name || ""}
            disabled
          />

          <DropdownPackAlasan
            name="reason"
            register={register}
          />

          <TextArea
            name="detailReason"
            placeholder="Tambahkan alasan spesifik anda di sini"
            {...register("detailReason")}
          />

          <div className="flex justify-start gap-5 mt-2">
            <SuccessButton text="Submit" />
            <DangerButton
              text="Reset"
              onClick={() =>
                reset({
                  nis: user?.nis || "",
                  reason: "",
                  detailReason: "",
                })
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAbsence;
