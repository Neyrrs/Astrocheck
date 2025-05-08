import { DoughnutChart, BarMonthsChart, LineChartThree } from "../Charts";
import { useAllPresence } from "@/Hooks/usePresence";
import { CardMembaca, CardMeminjam, CardLainnya } from "./CardPresences";

const GrafikAbsen = () => {
  const { averages, today, lastYear, fullYear, summaryMajor } =
    useAllPresence();

  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const comparisonDatas = [
    {
      labels: months,
      datasets: [
        {
          label: "Tahun Lalu",
          data: lastYear?.logsPerMonth.map((presence) => presence.count),
          borderColor: "#ff5c5c",
          backgroundColor: "#ff5c5c",
          pointStyle: "circle",
          pointRadius: 4,
          pointBackgroundColor: "white",
          borderWidth: 1,
        },
        {
          label: "Tahun Ini",
          data: fullYear?.logsPerMonth.map((presence) => presence.count),
          borderColor: "#6db2f7",
          backgroundColor: "#6db2f7",
          pointStyle: "circle",
          pointRadius: 4,
          pointBackgroundColor: "white",
          borderWidth: 1,
        },
      ],
    },
  ];

  const filteredPresence = [
    {
      alasan: "Hari ini",
      data: [today?.membaa, today?.meminjam, today?.lainnya],
      labels: ["Membaca", "Meminjam", "Lainnya"],
      colors: ["#98bddf", "#6db2f7", "#408dcc"],
    },
    {
      alasan: "Bulan ini",
      data: [30, 40, 30],
      labels: ["Membaca", "Meminjam", "Lainnya"],
      colors: ["#ff6b6b", "#ff8787", "#ffa8a8"],
    },
    {
      alasan: "Tahun ini",
      data: [100, 120, 80],
      labels: ["Membaca", "Meminjam", "Lainnya"],
      colors: ["#ff9f43", "#ffc078", "#ffd8a8"],
    },
  ];

  const lineChartStyle = "bg-white w-full h-55 rounded-lg px-5 py-2";
  const doughnutChartStyle =
    "flex justify-center flex-col gap-2 items-center bg-white w-70 h-75 rounded-lg py-5";

  const cardData = ["Membaca", "Meminjam", "Lainnya"];

  return (
    <div className="flex-col px-10 flex gap-10">
      <div className="flex-col gap-2 flex bg-[#f0f0f0]">
        <h1 className="font-bold text-2xl">Rata-rata kehadiran setiap bulan</h1>
        <div className="bg-white w-full h-80 rounded-lg px-4 py-2">
          <BarMonthsChart
            data={averages?.logsPerMonth.map((data) => data.count)}
            labels={months}
            title={"Rata-rata kehadiran setiap bulan"}
          />
        </div>
      </div>

      <div className="flex-col flex gap-15">
        <div className="flex-col flex gap-2">
          <h1 className="text-2xl font-bold">
            Grafik absen kategori membaca, meminjam, dan lainnya
          </h1>
          {[CardMembaca, CardMeminjam, CardLainnya].map((Card, index) => (
            <div key={index} className="flex flex-col py-2 gap-5 h-fit">
              <h1
                className={`text-xl font-bold ${index === 1 && `text-right`}`}
              >
                Absen {cardData[index]}
              </h1>
              <div className="grid grid-cols-3 gap-10 w-full h-fit">
                {index === 1 && (
                  <div className="col-span-2">
                    <div className={lineChartStyle}>
                      <LineChartThree />
                    </div>
                  </div>
                )}

                <div className="col-span-1">
                  <Card />
                </div>

                {index !== 1 && (
                  <div className="col-span-2">
                    <div className={lineChartStyle}>
                      <LineChartThree />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col bg gap-5">
          <h1 className="text-2xl font-semibold">Total kehadiran absen</h1>
          <div className="flex justify-between">
            {filteredPresence.map((presence, index) => (
              <div key={index} className={doughnutChartStyle}>
                <DoughnutChart
                  title={presence.alasan}
                  data={presence.data}
                  colors={presence.colors}
                  labels={presence.labels}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">
            Perbandingan data absen dengan tahun lalu
          </h1>
          <div className="bg-white w-full h-80 rounded-lg px-10 py-3">
            <LineChartThree
              datasets={comparisonDatas[0].datasets}
              labels={comparisonDatas[0].labels}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-2xl font-semibold">
            Urutan jurusan terbanyak absen
          </h1>
          <div className="bg-white w-full h-80 rounded-lg px-10 py-4">
            <BarMonthsChart
              data={summaryMajor?.map((major) => major?.count)}
              labels={summaryMajor?.map((major) => major?.major)}
              title={"Urutan jurusan terbanyak absen"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrafikAbsen;
