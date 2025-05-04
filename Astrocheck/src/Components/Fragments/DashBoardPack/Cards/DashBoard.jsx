import { LineChart } from "@/Components/Fragments/DashBoardPack/Charts";
import { useAllPresence } from "@/Hooks/usePresence.js";
import { CardLainnya, CardMembaca, CardMeminjam } from "./CardPresences.jsx";
import ProfileImage from "@/Components/Elements/Icons/ProfileImage";
import PresenceTableWrapper from "@/Components/Fragments/Table/PresenceTableWrapper";

const DashBoardPack = () => {
  const { fullYear } = useAllPresence();
  const fullYearData = fullYear?.logsPerMonth?.map((item) => item.count) ?? [];

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
    datasets: [{ label: "Absen Bulanan", data: fullYearData }],
  };

  const dashboardColumns = [
    { header: "ID", field: "__index" },
    { header: "Nama Lengkap", field: "fullName" },
    { header: "Kelas", field: "date" },
    { header: "Jurusan", field: "time" },
    { header: "Tanggal Presensi", field: "reason" },
    { header: "Alasan", field: "detailReason" },
    { header: "Spesifik Alasan", field: "detailReason" },
  ];

  return (
    <div>
      <div className="dashboard-container flex-col gap-5 flex bg-[#f0f0f0]">
        <div className="flex w-full flex-row gap-5">
          <div className="bg-white w-full h-25 gap-3 flex flex-row items-center rounded-xl px-5 ">
            <ProfileImage size="w-12 h-12" />
            <div className="h-fit w-fit">
              <p className="text-lg font-semibold">Welcome</p>
              <p className="text-slate-500 text-sm">Ezwan Ibnu Yassar</p>
            </div>
          </div>
          <div className="bg-white w-full h-25 gap-3 flex flex-row items-center justify-between rounded-xl px-5 ">
            <div className="h-fit w-fit flex flex-col gap-2">
              <p className="text-lg font-semibold">Dashboard Admin Panel</p>
              <p className="text-slate-500 text-sm">04 Mei 2025</p>
            </div>
            <ProfileImage size="w-12 h-12" />
          </div>
        </div>
        <div className="flex flex-row items-center gap-5 w-full justify-between">
          {[CardMembaca, CardMeminjam, CardLainnya].map((Card, index) => (
            <div key={index}>
              <Card />
            </div>
          ))}
        </div>
        <div className="bg-white w-full h-80 rounded-lg px-20 py-10">
          <LineChart
            data={LineChartData?.datasets[0]?.data}
            labels={LineChartData?.labels}
            label={LineChartData?.datasets[0]?.label}
          />
        </div>
        <div className="w-full h-fit bg-white rounded-lg pb-5 flex-col flex gap-3">
          <div className="px-5 w-full h-fit flex items-center py-5 border-b-2 border-slate-300">
            <p className="font-semibold text-xl">Terakhir Absen</p>
          </div>
          <PresenceTableWrapper
            data={[]}
            columns={dashboardColumns}
            loading={false}
            error={false}
            itemsPerPage={5}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPack;
