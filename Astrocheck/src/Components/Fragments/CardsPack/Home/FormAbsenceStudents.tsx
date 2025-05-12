"use client";

import { useEffect, useState } from "react";
import { DisabledInput, TextArea } from "@/Components/Elements/Inputs";
import { DangerButton, SuccessButton } from "@/Components/Elements/Buttons";
import {
  DropdownPackKelas,
  DropdownPackAlasan,
  DropdownPackJurusan,
} from "@/Components/Fragments/DropdownPack";
import Swal from "sweetalert2";
import axios from "axios";
import {useAllProfiles} from "@/Hooks/useProfile";

const showToast = (icon = "success", title = "", onClose = () => {}) => {
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

  Toast.fire({
    icon,
    title,
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer && !clicked) {
      onClose();
    }
  });
};

const FormAbsence = () => {
  const { user } = useAllProfiles();

  const [formData, setFormData] = useState({
    nisn: "",
    reason: "",
    detailReason: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nisn: user?.nisn,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.reason) {
      showToast("error", "Alasan tidak boleh kosong!");
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
      const token = localStorage.getItem("Token");
      await axios.post(
        `${backendUrl}/presence`,
        {
          reason: formData?.reason,
          detailReason: formData?.detailReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      showToast("success", "Absen berhasil, form akan otomatis ter-reset", () => {});

      setFormData({
        reason: "",
        detailReason: "",
      });
    } catch (error) {
      showToast(
        "error",
        error.response?.data?.message || "Gagal mengirim data"
      );
    }
  };

  return (
    <div className="bg-[#f9f9f9] rounded-xl w-[40rem] shadow-2xl py-10 mt-5 h-fit overflow-scroll">
      <div className="px-10 pb-10 text-base h-fit border-spacing-40 text-center gap-20 border-b-2 border-gray-300">
        <p className="text-3xl font-medium">Form Absen</p>
        <p className="text-xl">Astrolitera</p>
      </div>

      <div className="my-10 px-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="nisn" className="text-sm">
              NISN
            </label>
            <DisabledInput
              disabled
              type="number"
              name="nisn"
              value={user?.nisn || ""}
            />
          </div>

          <div>
            <label htmlFor="fullName" className="text-sm">
              Nama
            </label>
            <DisabledInput
              disabled
              type="text"
              name="fullName"
              value={user?.fullName || ""}
            />
          </div>

          <div>
            <DropdownPackKelas
              name="kelas"
              value={user?.grade || ""}
              disabled
            />
          </div>

          <div>
            <DropdownPackJurusan
              name="jurusan"
              value={user?.idMajor?.major_name || ""}
              disabled
            />
          </div>

          <div>
            <DropdownPackAlasan
              name="reason"
              value={formData.reason}
              onChange={handleChange}
            />
          </div>

          <div>
            <TextArea
              name="detailReason"
              placeholder="Tambahkan alasan spesifik anda di sini"
              value={formData.detailReason}
              onChange={handleChange}
              disabled={formData.reason === "Lainnya" ? false : true}
            />
          </div>

          <div className="flex justify-start gap-5">
            <SuccessButton text="Submit" type="submit" />
            <DangerButton
              text="Reset"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  reason: "",
                  detailReason: "",
                }))
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAbsence;
