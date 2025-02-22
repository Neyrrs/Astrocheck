import { useEffect, useState } from "react";
import { Input, TextArea } from "../../../Elements/Inputs";
import { DangerButton, SuccessButton } from "../../../Elements/Buttons";
import {
  DropdownPackKelas,
  DropdownPackAlasan,
  DropdownPackJurusan,
} from "../../DropdownPack";
import Swal from "sweetalert2";
import axios from "axios";
import useProfile from "../../../../Hooks/useProfile";

const FormAbsence = () => {
  const {user} = useProfile();

  const [formData, setFormData] = useState({
    nisn: "",
    fullName: "",
    nickname: "",
    email : "",
    kelas: "",
    jurusan: "",
    alasan: "",
    detailAlasan: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        nisn: user.nisn || "",
        fullName: user.fullName || "",
        kelas: user.kelas || "",
        jurusan: user.jurusan || "",
        email: user.email,
        nickname: user.nickname,
        alasan: "",
        detailAlasan: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.alasan) {
      Swal.fire({
        title: "Error",
        text: "Alasan tidak boleh kosong!",
        icon: "error",
      });
      return;
    }

    try {
      await axios.post("http://localhost:3000/presence", formData);
      Swal.fire({
        title: "Data berhasil tercatat!",
        text: `Selamat datang di perpustakaan Astrolitera, ${formData.fullName}. Anda telah berhasil melakukan absensi.`,
        icon: "success",
      });

      setFormData((prev) => ({
        ...prev,
        alasan: "",
        detailAlasan: "",
      }));
    } catch (error) {
      Swal.fire({
        title: "Gagal mengirim data",
        text:
          error.response?.data?.message ||
          "Terjadi masalah saat mengirimkan data ke server.",
        icon: "error",
      });
    }
  };

  return (
    <div className="bg-[#f9f9f9] rounded-xl w-[40rem] shadow-2xl py-10 mt-5 h-fit overflow-scroll">
      {/* Header */}
      <div className="px-10 pb-10 text-base h-fit border-spacing-40 text-center gap-20 border-b-2">
        <p className="text-3xl font-medium">Form Absen</p>
        <p className="text-xl">Astrolitera</p>
      </div>

      <div className="my-10 px-24">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div>
            <label htmlFor="nisn" className="text-sm">
              NISN
            </label>
            <Input disabled type="number" name="nisn" value={formData.nisn} />
          </div>

          <div>
            <label htmlFor="fullName" className="text-sm">
              Nama
            </label>
            <Input
              disabled
              type="text"
              name="fullName"
              value={formData.fullName}
            />
          </div>

          <div>
            <DropdownPackKelas name="kelas" value={formData.kelas} disabled />
          </div>

          <div>
            <DropdownPackJurusan
              name="jurusan"
              value={formData.jurusan}
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
