import React from "react";

const fakeDatas = [
  {
    id: 1,
    nisn: "0023456781",
    namaLengkap: "Aldi Saputra",
    kelas: "X",
    jurusan: "RPL",
    totalAbsen: 4.239,
    totalWaktu: 82.59,
    totalMembaca: 1489,
    totalMeminjam: 1798,
    totalKeterlambatan: 952,
  },
  {
    id: 2,
    nisn: "0032456712",
    namaLengkap: "Budi Santoso",
    kelas: "XIII",
    jurusan: "DKV",
    totalAbsen: 2.912,
    totalWaktu: 79.23,
    totalMembaca: 882,
    totalMeminjam: 790,
    totalKeterlambatan: 1240,
  },
  {
    id: 3,
    nisn: "0045678923",
    namaLengkap: "Citra Amelia",
    kelas: "X",
    jurusan: "DPIB",
    totalAbsen: 2.892,
    totalWaktu: 40.5,
    totalMembaca: 892,
    totalMeminjam: 1823,
    totalKeterlambatan: 177,
  },
  {
    id: 4,
    nisn: "0056789123",
    namaLengkap: "Dinda Maharani",
    kelas: "XIII",
    jurusan: "DPIB",
    totalAbsen: 1.423,
    totalWaktu: 39.52,
    totalMembaca: 780,
    totalMeminjam: 342,
    totalKeterlambatan: 301,
  },
  {
    id: 5,
    nisn: "0067891234",
    namaLengkap: "Eka Pratama",
    kelas: "XI",
    jurusan: "TOI",
    totalAbsen: 820,
    totalWaktu: 20.1,
    totalMembaca: 390,
    totalMeminjam: 430,
    totalKeterlambatan: 0,
  },
];

// Variabel untuk reuse className
const tablePadding = "p-3 border";

const CardSiswaTerbanyakAbsen = () => {
  return (
    <>
      <div className="overflow-scroll">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#f0f0f0] whitespace-nowrap text-lg text-center">
              <td className={tablePadding}>No</td>
              <td className={tablePadding}>NISN</td>
              <td className={tablePadding}>Nama Lengkap</td>
              <td className={tablePadding}>Kelas</td>
              <td className={tablePadding}>Jurusan</td>
              <td className={tablePadding}>Total Absen</td>
              <td className={tablePadding}>Total Waktu</td>
              <td className={tablePadding}>Total Membaca</td>
              <td className={tablePadding}>Total Meminjam</td>
              <td className={tablePadding}>Total Lainnya</td>
            </tr>
          </thead>
          <tbody>
            {fakeDatas.map((data, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-[#f0f0f0]"}
              >
                <td className={`${tablePadding} text-center`}>{data.id}</td>
                <td className={tablePadding}>{data.nisn}</td>
                <td className={tablePadding}>{data.namaLengkap}</td>
                <td className={`${tablePadding} text-center`}>{data.kelas}</td>
                <td className={tablePadding}>{data.jurusan}</td>
                <td className={`${tablePadding} text-right`}>{data.totalAbsen}</td>
                <td className={`${tablePadding} text-right`}>{data.totalWaktu}</td>
                <td className={`${tablePadding} text-right`}>{data.totalMembaca}</td>
                <td className={`${tablePadding} text-right`}>{data.totalMeminjam}</td>
                <td className={`${tablePadding} text-right`}>{data.totalKeterlambatan}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CardSiswaTerbanyakAbsen;
