import React from "react";
import LineChartThree from "./LineChartThree";
import BarMonthsChart from "./BarMonthsChart"
import DoughnutChart from "./DoughnutChart";
import CardSiswaTerbanyakAbsen from "./CardSiswaTerbanyakAbsen";

let numberList = 1;
const data = [
  {
    id: 1,
    nisn: "0023456781",
    nama: "Aldi Saputra",
    kelas: "X",
    jurusan: "RPL",
    totalAbsen: 4239,
    totalWaktu: 82.59,
    totalMembaca: 1489,
    totalMeminjam: 1798,
    totalLainnya: 952,
    alasan: "Aktif",
  },
  {
    id: 2,
    nisn: "0032456712",
    nama: "Budi Santoso",
    kelas: "XIII",
    jurusan: "DKV",
    totalAbsen: 2912,
    totalWaktu: 79.23,
    totalMembaca: 882,
    totalMeminjam: 790,
    totalLainnya: 1240,
    alasan: "Tugas",
  },
  {
    id: 3,
    nisn: "0045678923",
    nama: "Citra Amelia",
    kelas: "X",
    jurusan: "DPIB",
    totalAbsen: 2892,
    totalWaktu: 40.50,
    totalMembaca: 892,
    totalMeminjam: 1823,
    totalLainnya: 177,
    alasan: "Membaca",
  },
  {
    id: 4,
    nisn: "0056789123",
    nama: "Dinda Maharani",
    kelas: "XIII",
    jurusan: "DPIB",
    totalAbsen: 1423,
    totalWaktu: 39.52,
    totalMembaca: 780,
    totalMeminjam: 342,
    totalLainnya: 301,
    alasan: "Tugas",
  },
  {
    id: 5,
    nisn: "0067891234",
    nama: "Eka Pratama",
    kelas: "XI",
    jurusan: "TOI",
    totalAbsen: 820,
    totalWaktu: 20.10,
    totalMembaca: 390,
    totalMeminjam: 430,
    totalLainnya: 0,
    alasan: "Tidak Aktif",
  },
];


const GrafikAbsen = () => {
  // Styles
  const grafikAbsensiCardStyle =
    "w-[21rem] h-[15rem] rounded-md px-8 pt-10 pb-[9rem] text-white ";
  const lineChartStyle = "bg-white w-[45rem] h-[15rem] rounded-lg px-10 py-2";
  const doughnutChartStyle = "bg-white w-70 h-[20rem] rounded-lg py-16";
  //   Styles

  const cardData = ["Membaca", "Meminjam", "Lainnya"];
  return (
    <>
      <div className="flex-col px-10 flex gap-20">
        <div className="flex-col gap-5 flex bg-[#f0f0f0]">
          <h1 className="font-semibold text-2xl">
            Rata-rata kehadiran setiap bulan
          </h1>
          <div className="bg-white w-full h-80 rounded-lg px-10 py-10">
            <BarMonthsChart />
          </div>
        </div>
        <div className="flex-col flex gap-16">
          <div className="flex-col flex gap-8">
            <h1 className="text-2xl font-semibold">
              Grafik absen kategori membaca, meminjam, dan lainnya
            </h1>
            <div className="flex flex-col gap-5">
              {cardData.map((card, index) => (
                <>
                  <h1 className="text-xl font-semibold">Absen {card}</h1>
                  <div
                    className={`flex gap-10 ${
                      card === "Meminjam" ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div className={lineChartStyle}>
                      <LineChartThree />
                    </div>
                    <div
                      key={index}
                      className={`${
                        card === "Membaca"
                          ? "Membaca"
                          : card === "Meminjam"
                          ? "Meminjam"
                          : "Lainnya"
                      } ${grafikAbsensiCardStyle}`}
                    >
                      <div className="flex flex-col gap-3">
                        <p className="text-base">Absensi {card}</p>
                        <p className="text-3xl font-semibold">546 Orang</p>
                      </div>
                      <p className="mt-8">Hari ini !</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <h1 className="text-2xl font-semibold">Total kehadiran absen</h1>
            <div className="flex gap-10 justify-between">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className={doughnutChartStyle}>
                    <DoughnutChart />
                  </div>
                ))}
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">
              Perbandingan data absen dengan tahun lalu
            </h1>
            <div className="bg-white w-full h-[20rem] rounded-lg px-10 py-3">
              <LineChartThree />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <h1 className="text-2xl font-semibold">
              Urutan jurusan terbanyak absen
            </h1>
            <div className="bg-white w-full h-80 rounded-lg px-10 py-10">
              <BarMonthsChart />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-semibold">
              Urutan siswa/i terbanyak absen
            </h1>
            <CardSiswaTerbanyakAbsen />
          </div>
        </div>
      </div>
    </>
  );
};

export default GrafikAbsen;
