import React from "react";
import SearchPack from "../SearchPack/SearchPack";

const ManajemenAkun = () => {
  const students = [
    {
      id: 1,
      nisn: "1234567890",
      namaLengkap: "Biru Kheza Maharley",
      namaTampilan: "biruastrocheck",
      kelas: "X",
      jurusan: "RPL",
      email: "birukhezamaharley@gmail.com",
      password: "biru123456790",
    },
    {
      id: 2,
      nisn: "1234567891",
      namaLengkap: "Ahmad Zulfikar",
      namaTampilan: "AhmadZ",
      kelas: "XII",
      jurusan: "DKV",
      email: "ahmadz@gmail.com",
      password: "@Ahmad12345",
    },
    {
      id: 3,
      nisn: "1234567892",
      namaLengkap: "Bella Ramadhani",
      namaTampilan: "BellaR",
      kelas: "X",
      jurusan: "DPIB",
      email: "bella.r@gmail.com",
      password: "Bella2024!",
    },
    {
      id: 4,
      nisn: "1234567894",
      namaLengkap: "Chandra Wijaya",
      namaTampilan: "ChandraW",
      kelas: "XIII",
      jurusan: "SIJA",
      email: "chandra.wijaya@gmail.com",
      password: "Chandra123",
    },
    {
      id: 5,
      nisn: "1234567895",
      namaLengkap: "Dedi Susanto",
      namaTampilan: "DediS",
      kelas: "XI",
      jurusan: "TKJ",
      email: "dedi.s@gmail.com",
      password: "Dedi4567!",
    },
    {
      id: 6,
      nisn: "1234567896",
      namaLengkap: "Erna Susilowati",
      namaTampilan: "ErnaS",
      kelas: "X",
      jurusan: "TKP",
      email: "erna.susilowati@gmail.com",
      password: "ErnaPass1",
    },
    {
      id: 7,
      nisn: "1234567897",
      namaLengkap: "Farhan Al Farisi",
      namaTampilan: "FarhanA",
      kelas: "XII",
      jurusan: "TP",
      email: "farhan.f@gmail.com",
      password: "Farhan123!",
    },
    {
      id: 8,
      nisn: "1234567898",
      namaLengkap: "Gina Lestari",
      namaTampilan: "GinaL",
      kelas: "XIII",
      jurusan: "TOI",
      email: "gina.lestari@gmail.com",
      password: "Gina2023",
    },
    {
      id: 9,
      nisn: "1234567899",
      namaLengkap: "Hariyanto Saputra",
      namaTampilan: "HariyantoS",
      kelas: "X",
      jurusan: "TFLM",
      email: "hari.saputra@gmail.com",
      password: "Hary12345!",
    },
    {
      id: 10,
      nisn: "1234567900",
      namaLengkap: "Indra Kurniawan",
      namaTampilan: "IndraK",
      kelas: "XI",
      jurusan: "TKR",
      email: "indra.kurniawan@gmail.com",
      password: "Indra@Cool",
    },
    {
      id: 11,
      nisn: "1234567901",
      namaLengkap: "Joko Santoso",
      namaTampilan: "JokoS",
      kelas: "XII",
      jurusan: "DPIB",
      email: "joko.santoso@gmail.com",
      password: "Joko_123",
    },
    {
      id: 12,
      nisn: "1234567902",
      namaLengkap: "Kartini Handayani",
      namaTampilan: "KartiniH",
      kelas: "XIII",
      jurusan: "RPL",
      email: "kartini.h@gmail.com",
      password: "Kartini@1",
    },
  ];

  const tablePadding = "p-[10px]";

  return (
    <div className="h-fit">
      <div className="relative w-full h-[80px]">
        <div className="absolute w-80 top-5 right-0">
          <SearchPack width="fit" />
        </div>
      </div>
      <div className="overflow-scroll border-t-2 border-spacing-9 py-5 border-slate-400">
        <table className="w-full border-collapse">
          <thead>
            <tr className="whitespace-nowrap pb-5 text-gray-500 text-base">
              <td className={tablePadding}>ID</td>
              <td className={tablePadding}>NISN</td>
              <td className={tablePadding}>Nama Lengkap</td>
              <td className={tablePadding}>Nama Tampilan</td>
              <td className={tablePadding}>Kelas</td>
              <td className={tablePadding}>Jurusan</td>
              <td className={tablePadding}>Email</td>
              <td className={tablePadding}>Password</td>
            </tr>
          </thead>
          <tbody>
            {students.map((data, index) => (
              <tr
                key={index}
                className={`whitespace-nowrap ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"
                }`}
              >
                <td className={`${tablePadding} text-center`}>{data.id}</td>
                <td className={tablePadding}>{data.nisn}</td>
                <td className={tablePadding}>{data.namaLengkap}</td>
                <td className={tablePadding}>{data.namaTampilan}</td>
                <td className={`${tablePadding} text-center`}>{data.kelas}</td>
                <td className={tablePadding}>{data.jurusan}</td>
                <td className={`${tablePadding} text-left`}>{data.email}</td>
                <td className={`${tablePadding} text-left`}>{data.password}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenAkun;
