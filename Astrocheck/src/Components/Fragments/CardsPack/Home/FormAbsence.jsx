import { useState } from "react";
import { Input, TextArea } from "../../../Elements/Inputs";
import { DangerButton, SuccessButton } from "../../../Elements/Buttons";
import {
  DropdownPackKelas,
  DropdownPackAlasan,
  DropdownPackJurusan,
} from "../../DropdownPack";
import Swal from "sweetalert2";
import axios from "axios";

const FormAbsence = () => {
  const [nisn, setNisn] = useState("");
  const [fullName, setFullName] = useState("");
  const [kelas, setKelas] = useState("");
  const [alasan, setAlasan] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [detailAlasan, setDetailAlasan] = useState("");

  const handleSendForm = async (e) => {
    e.preventDefault();
    if (!nisn || !fullName || !kelas || !alasan || !jurusan) {
      Swal.fire({
        title: "Error",
        text: "Semua field wajib diisi!",
        icon: "error",
      });
      return;
    }
    const response = await axios.post("http://localhost:3000/Presence", { nisn, fullName, kelas, alasan, jurusan, detailAlasan })
      .then(() => {
        Swal.fire({
          title: "Data berhasil tercatat!",
          text: "Silakan lanjutkan dengan memilih tempat duduk yang tersedia di area perpustakaan.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Absen berhasil",
              text: `Selamat datang di perpustakaan Astrolitera, ${fullName}. Anda telah berhasil melakukan absensi`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Logout",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/";
                localStorage.removeItem("Token");
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        Swal.fire({
          title: "Gagal mengirim data",
          text:
            error.response?.data?.message ||
            "Terjadi masalah saat mengirimkan data ke server.",
          icon: "error",
        });
      });
  };

  return (
    <div className="bg-[#f9f9f9] rounded-xl w-[40rem] shadow-2xl py-10 mt-5 h-fit overflow-scroll">
      <div className="px-10 pb-10 text-base h-fit border-spacing-40 text-center gap-20 border-b-2">
        <p className="text-3xl font-medium">Form Absen</p>
        <p className="text-xl">Astrolitera</p>
      </div>
      <div className="my-10 px-24">
        <form onSubmit={handleSendForm} className="flex flex-col gap-2">
          <div>
            <label htmlFor="NISN" className="text-sm">
              NISN
            </label>
            <Input
              type="number"
              name="NISN"
              placeholder="Contoh: 1234567890"
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="nama" className="text-sm">
              Nama
            </label>
            <Input
              type="text"
              name="nama"
              placeholder="Contoh: Ezwan Ibnu Yassar"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div>
            <DropdownPackKelas
              name="kelas"
              id="kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            />
          </div>
          <div>
            <DropdownPackJurusan
              name="jurusan"
              id="jurusan"
              value={jurusan}
              onChange={(e) => setJurusan(e.target.value)}
            />
          </div>
          <div>
            <DropdownPackAlasan
              name="alasan"
              id="alasan"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            />
          </div>
          <div className="">
            <TextArea
              placeholder="Tambahkan alasan spesifik anda di sini"
              name="detailAlasan"
              id="detailAlasan"
              value={detailAlasan}
              onChange={(e) => setDetailAlasan(e.target.value)}
            />
          </div>
          <div className="flex justify-start gap-5">
            <SuccessButton text="Submit" />
            <DangerButton text="Reset" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAbsence;
