import React from "react";
import SearchPack from "../SearchPack/SearchPack";

const ManajemenAbsen = () => {
  const absences = [
    {
      id: 1,
      nisn: "1234567890",
      namaLengkap: "Biru Kheza Maharley",
      kelas: "X",
      jurusan: "RPL",
      tanggalAbsen: "2024-01-15",
      waktuMasuk: "08:00",
      waktuKeluar: "10:00",
      keterangan: "Membaca",
    },
    {
      id: 2,
      nisn: "1234567891",
      namaLengkap: "Ahmad Zulfikar",
      kelas: "XII",
      jurusan: "DKV",
      tanggalAbsen: "2024-01-16",
      waktuMasuk: "09:10",
      waktuKeluar: "11:30",
      keterangan: "Meminjam",
    },
    {
      id: 3,
      nisn: "1234567892",
      namaLengkap: "Bella Ramadhani",
      kelas: "X",
      jurusan: "DPIB",
      tanggalAbsen: "2024-01-17",
      waktuMasuk: "08:20",
      waktuKeluar: "09:50",
      keterangan: "Membaca",
    },
    {
      id: 4,
      nisn: "1234567894",
      namaLengkap: "Chandra Wijaya",
      kelas: "XIII",
      jurusan: "SIJA",
      tanggalAbsen: "2024-01-18",
      waktuMasuk: "10:00",
      waktuKeluar: "12:00",
      keterangan: "Meminjam",
    },
    {
      id: 5,
      nisn: "1234567895",
      namaLengkap: "Dedi Susanto",
      kelas: "XI",
      jurusan: "TKJ",
      tanggalAbsen: "2024-01-19",
      waktuMasuk: "07:50",
      waktuKeluar: "09:45",
      keterangan: "Lainnya",
    },
  ];
  const tablePadding = "p-[10px]";

  return (
    <div className="h-screen">
      <div className="relative w-[full] h-[80px]">
        <div className="absolute w-80 top-5 right-0">
          <SearchPack width="fit" />
        </div>
      </div>
      <div className="overflow-scroll border-t-2 border-spacing-9 py-5 border-slate-400">
        <table className="w-full border-collapse">
          <thead>
            <tr className="whitespace-nowrap pb-5 text-gray-500 text-base ">
              <td className={tablePadding}>ID</td>
              <td className={tablePadding}>NISN</td>
              <td className={tablePadding}>Nama Lengkap</td>
              <td className={tablePadding}>Kelas</td>
              <td className={tablePadding}>Jurusan</td>
              <td className={tablePadding}>Tanggal Absen</td>
              <td className={tablePadding}>Waktu Masuk</td>
              <td className={tablePadding}>Waktu Keluar</td>
              <td className={tablePadding}>Keterangan</td>
            </tr>
          </thead>
          <tbody>
            {absences.map((data, index) => (
              <tr
                key={index}
                className={`whitespace-nowrap ${
                  index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"
                }`}
              >
                <td className={`${tablePadding} text-center`}>{data.id}</td>
                <td className={tablePadding}>{data.nisn}</td>
                <td className={tablePadding}>{data.namaLengkap}</td>
                <td className={tablePadding}>{data.kelas}</td>
                <td className={tablePadding}>{data.jurusan}</td>
                <td className={tablePadding}>{data.tanggalAbsen}</td>
                <td className={tablePadding}>{data.waktuMasuk}</td>
                <td className={tablePadding}>{data.waktuKeluar}</td>
                <td className={tablePadding}>{data.keterangan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManajemenAbsen;
