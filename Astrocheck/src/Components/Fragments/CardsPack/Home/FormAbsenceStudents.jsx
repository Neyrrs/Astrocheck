'use client';

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
import useProfile from "@/Hooks/useProfile";
import { useRouter } from "next/navigation";

const showToast = (icon = "success", title = "", onClose = () => {}) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  Toast.fire({
    icon,
    title,
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      onClose();
    }
  });
};

const FormAbsence = () => {
  const { user } = useProfile();
  const navigate = useRouter();

  const [formData, setFormData] = useState({
    nisn: "",
    alasan: "",
    detailAlasan: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        nisn: user.nisn,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.alasan) {
      showToast("error", "Alasan tidak boleh kosong!");
      return;
    }

    try {
      await axios.post(`http://localhost:4000/presence/${user?.nisn}`, {
        alasan: formData.alasan,
        detailAlasan: formData.detailAlasan,
      });

      showToast(
        "success",
        "Absen berhasil, akun akan otomatis logout",
        () => {
          localStorage.removeItem("Token");
          navigate("/login");
        }
      );

      setFormData({
        alasan: "",
        detailAlasan: "",
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
              value={user?.kelas || ""}
              disabled
            />
          </div>

          <div>
            <DropdownPackJurusan
              name="jurusan"
              value={user?.jurusan || ""}
              disabled
            />
          </div>

          <div>
            <DropdownPackAlasan
              name="alasan"
              value={formData.alasan}
              onChange={handleChange}
            />
          </div>

          <div>
            <TextArea
              name="detailAlasan"
              placeholder="Tambahkan alasan spesifik anda di sini"
              value={formData.detailAlasan}
              onChange={handleChange}
              disabled={formData.alasan === "Lainnya" ? false : true}
            />
          </div>

          <div className="flex justify-start gap-5">
            <SuccessButton text="Submit" type="submit" />
            <DangerButton
              text="Reset"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  alasan: "",
                  detailAlasan: "",
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
