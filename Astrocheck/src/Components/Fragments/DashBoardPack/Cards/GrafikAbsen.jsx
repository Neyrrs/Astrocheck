import { DoughnutChart, BarMonthsChart, LineChartThree } from "../Charts";
import CardSiswaTerbanyakAbsen from "./CardSiswaTerbanyakAbsen";
import { useAllPresence } from "../../../../Hooks/usePresence";


const GrafikAbsen = () => {
  const {averages} = useAllPresence();
  console.log(averages?.logsPerMonth??[]);
  
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
            <BarMonthsChart data/>
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
