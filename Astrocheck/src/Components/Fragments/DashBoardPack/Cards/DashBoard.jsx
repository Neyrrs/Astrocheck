import { LineChart, DoughnutChart, BarChart } from "@/Components/Fragments/DashBoardPack/Charts";
import { useAllPresence } from ".@/Hooks/usePresence.js";
import { CardLainnya, CardMembaca, CardMeminjam } from "./CardPresences.jsx";

const DashBoardPack = () => {
  const {fullYear, allPresences } = useAllPresence();
  const fullYearData = fullYear?.logsPerMonth?.map((item) => item.count) ?? [];
  const allDataPresences = [
    allPresences?.membaca,
    allPresences?.meminjam,
    allPresences?.lainnya,
  ];

  const LineChartData = {
    labels: [
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
    ],
    datasets: [{ label: "Absen Bulanan", data: fullYearData}],
  };
  
  return (
    <div>
      <div className="dashboard-container flex-col gap-10 flex bg-[#f0f0f0]">
        <div className="flex items-center justify-between">
        {[CardMembaca, CardMeminjam, CardLainnya].map((Card, index) => (
            <div key={index}>
                <Card />
            </div>
          ))}
        </div>
        <div className="bg-white w-full h-80 rounded-lg px-32 py-10">
          <LineChart data={LineChartData?.datasets[0]?.data} labels={LineChartData?.labels} label={LineChartData?.datasets[0]?.label} />
        </div>
        <div className="flex gap-10">
          <div className="bg-white w-full h-80 rounded-lg p-6">
            <BarChart />
          </div>
          <div className="bg-white w-96 h-80 rounded-lg py-14">
            <DoughnutChart data={allDataPresences} colors={["#98bddf", "#ff6b6b", "#ff9f43"]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPack;
