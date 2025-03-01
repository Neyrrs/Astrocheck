import { DoughnutChart, BarMonthsChart, LineChartThree } from "../Charts";
import CardSiswaTerbanyakAbsen from "./CardSiswaTerbanyakAbsen";
import { useAllPresence } from "../../../../Hooks/usePresence";
import { CardMembaca, CardMeminjam, CardLainnya } from "./CardPresences";

// TODO Implementasikan component baru yang dibuat di CardPresences ke sini dan ke page DashBoard

const GrafikAbsen = () => {
  const { averages, allPresences, fullYear, presence } = useAllPresence();

  const barDataAverage =
    averages?.logsPerMonth.map((item) => item.rataRata) || [];

  const data = fullYear?.logsPerMonth || [];
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthStr = currentMonth.toString().padStart(2, "0");
  const currentData = data.find((item) => item.month === currentMonthStr);

  const presences = allPresences?.presence.map((item) => item.alasan) || [];
  const filteredPresence = [
    {
      alasan: "Harian",
      data: [
        presence?.count?.Membaca,
        presence?.count?.Meminjam,
        presence?.count?.Lainnya,
      ],
      color: "#98bddf",
    },
    {
      alasan: "Bulanan",
      data: presences.filter((item) => item === "Meminjam").length,
      color: "#ff6b6b",
    },
    {
      alasan: "Tahun ini",
      data: [currentData?.membaca, currentData?.meminjam, currentData?.lainnya],
      color: "#ff9f43",
    },
  ];

  const grafikAbsensiCardStyle =
    "w-[21rem] h-[15rem] rounded-md px-8 pt-10 pb-[9rem] text-white";
  const lineChartStyle = "bg-white w-[45rem] h-[15rem] rounded-lg px-10 py-2";
  const doughnutChartStyle = "bg-white w-70 h-[20rem] rounded-lg py-16";

  const cardData = ["Membaca", "Meminjam", "Lainnya"];

  return (
    <div className="flex-col px-10 flex gap-20">
      <div className="flex-col gap-5 flex bg-[#f0f0f0]">
        <h1 className="font-semibold text-2xl">
          Rata-rata kehadiran setiap bulan
        </h1>
        <div className="bg-white w-full h-80 rounded-lg px-10 py-10">
          <BarMonthsChart data={barDataAverage} />
        </div>
      </div>

      <div className="flex-col flex gap-16">
        <div className="flex-col flex gap-8">
          <h1 className="text-2xl font-semibold">
            Grafik absen kategori membaca, meminjam, dan lainnya
          </h1>
          {[CardMembaca, CardMeminjam, CardLainnya].map((Card, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h1
                className={`text-xl font-semibold ${
                  index === 1 && `text-right`
                }`}
              >
                Absen {cardData[index]}
              </h1>
              <div className="flex gap-5">
                {index === 1 && (
                  <div className={lineChartStyle}>
                    <LineChartThree />
                  </div>
                )}
                <Card />
                {index !== 1 && (
                  <div className={lineChartStyle}>
                    <LineChartThree />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-10">
          <h1 className="text-2xl font-semibold">Total kehadiran absen</h1>
          <div className="flex gap-10 justify-between">
            {filteredPresence.map((presence, index) => (
              <div key={index} className={doughnutChartStyle}>
                <DoughnutChart
                  data={presence.data}
                  colors={[presence.color]}
                  labels={[presence.alasan]}
                />
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
  );
};

export default GrafikAbsen;
