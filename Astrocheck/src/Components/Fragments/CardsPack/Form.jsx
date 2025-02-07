import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const FormAbsen = () => {
  const [NISN, setNISN] = useState("");
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [alasan, setAlasan] = useState("");

  const handleSendForm = (e) => {
    e.preventDefault();
    if (!NISN || !nama || !kelas || !alasan) {
      Swal.fire({
        title: "Error",
        text: "Semua field wajib diisi!",
        icon: "error",
      });
      return;
    }
    const formData = {
      NISN: NISN,
      nama: nama,
      kelas: kelas,
      alasan: alasan,
    };
    axios
      .post("http://localhost:3000/Presence", formData)
      .then((response) => {
        Swal.fire({
          title: "Data berhasil tercatat!",
          text: "Silakan lanjutkan dengan memilih tempat duduk yang tersedia di area perpustakaan.",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Absen berhasil",
              text: `Selamat datang di perpustakaan Astrolitera, ${nama}. Anda telah berhasil melakukan absensi`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Logout",
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = "/Login";
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
      <div className="my-14 px-28">
        <form onSubmit={handleSendForm}>
          <div className="my-3">
            <label htmlFor="NISN" className="text-sm">
              NISN
            </label>
            <input
              type="text"
              name="NISN"
              placeholder="Contoh: 1234567890"
              className="text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
              value={NISN}
              onChange={(e) => setNISN(e.target.value)}
            />
          </div>
          <div className="my-3">
            <label htmlFor="nama" className="text-sm">
              Nama
            </label>
            <input
              type="text"
              name="nama"
              placeholder="Nama lengkap anda"
              className="text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            />
          </div>

          {/* Dropdown Kelas */}
          <div className="my-3">
            <label htmlFor="kelas" className="text-sm">
              Kelas
            </label>
            <select
              name="kelas"
              id="kelas"
              className="focus:border-[#6384E9] hover:border-[#6384E9] outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
            >
              <option value="">Pilih Kelas</option>
              <option value="X">X</option>
              <option value="XI">XI</option>
              <option value="XII">XII</option>
              <option value="XIII">XIII</option>
            </select>
          </div>

          {/* Dropdown Alasan */}
          <div className="my-3">
            <label htmlFor="alasan" className="text-sm">
              Alasan
            </label>
            <select
              name="alasan"
              id="alasan"
              className="focus:border-[#6384E9] hover:border-[#6384E9] outline-none focus:shadow-md hover:shadow-md duration-150 ease-in text-gray-500 border-[2px] px-1 mb-2 py-[0.3rem] rounded-md text-xs w-full"
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
            >
              <option value="">Pilih Alasan</option>
              <option value="Sakit">Sakit</option>
              <option value="Izin">Izin</option>
            </select>
          </div>

          {/* Tombol Kirim dan Reset */}
          <div className="flex my-8 justify-end gap-5">
            <button
              type="reset"
              className="bg-red-500 text-white px-4 py-2 rounded-md text-xs hover:bg-red-600"
            >
              Reset
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs hover:bg-blue-600"
            >
              Kirim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormAbsen;
