import { LineChart, DoughnutChart, BarChart } from "../Charts";
import { useAllPresence } from "../../../../Hooks/usePresence.js";

const DashBoardPack = () => {
  const { presence, fullYear } = useAllPresence();
  const datas = fullYear?.logsPerMonth?.map(item => item.count) ?? [];
  
  const dashboardCardStyle =
    "w-[21rem] h-[14rem] rounded-md bg-[#4253] px-8 pt-10 pb-52 text-white ";
  return (
    <div>
      <div className="dashboard-container flex-col gap-10 flex bg-[#f0f0f0]">
        <div className="flex items-center justify-between">
          <div className={`Membaca ${dashboardCardStyle}`}>
            <div className="flex flex-col gap-3 ">
              <p className="text-base">Absen Membaca</p>
              <p className="text-3xl font-semibold">
                {presence?.count?.Membaca ?? 0} Orang
              </p>
            </div>
            <p className="mt-8">Hari ini !</p>
          </div>
          <div className={`Meminjam ${dashboardCardStyle}`}>
            <div className="flex flex-col gap-3 ">
              <p className="text-base">Absen Meminjam</p>
              <p className="text-3xl font-semibold">
                {presence?.count?.Meminjam ?? 0} Orang
              </p>
            </div>
            <p className="mt-8">Hari ini !</p>
          </div>
          <div className={`Lainnya ${dashboardCardStyle}`}>
            <div className="flex flex-col gap-3 ">
              <p className="text-base">Absen Lainnya</p>
              <p className="text-3xl font-semibold">
                {presence?.count?.Lainnya ?? 0} Orang
              </p>
            </div>
            <p className="mt-8">Hari ini !</p>
          </div>
        </div>
        <div className="bg-white w-full h-80 rounded-lg px-32 py-10">
          <LineChart data={datas}/>
        </div>
        <div className="flex gap-10">
          <div className="bg-white w-full h-80 rounded-lg p-6">
            <BarChart />
          </div>
          <div className="bg-white w-96 h-80 rounded-lg py-14">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardPack;
