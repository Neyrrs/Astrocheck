import { useState, useEffect } from "react";
import { useAllPresence } from "../../../../Hooks/usePresence";

const styleCard =
  "w-[21rem] h-[15rem] rounded-md px-8 pt-10 pb-[9rem] text-white";

const usePresenceData = () => {
  const { fullYear, presence } = useAllPresence();
  const [presencesIndex, setPresencesIndex] = useState(0);
  const [currentMonthData, setCurrentMonthData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = fullYear?.logsPerMonth || [];
      const currentMonth = new Date().getMonth() + 1;
      const currentMonthStr = currentMonth.toString().padStart(2, "0");
      const currentData = data.find((item) => item.month === currentMonthStr);
      setCurrentMonthData(currentData?.membaca || 0);
    };
    fetchData();
  }, [fullYear]);

  const handleChange = () => {
    setPresencesIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
  };

  return {
    presencesIndex,
    handleChange,
    presenceData: [currentMonthData, fullYear?.membaca, presence?.membaca],
    labels: ["Hari ini", "Bulan ini", "Tahun ini"],
  };
};

const CardPresence = ({ title }) => {
  const { presencesIndex, handleChange, presenceData, labels } =
    usePresenceData();

  return (
    <div className={`${title} ${styleCard}`}>
      <div className="flex flex-col gap-3">
        <p className="text-base">{title}</p>
        <p className="text-3xl font-semibold">{presenceData[presencesIndex]} Orang</p>
      </div>
      <button className="mt-8" onClick={handleChange}>
        {labels[presencesIndex]}
      </button>
    </div>
  );
};

export const CardMembaca = () => <CardPresence title="Membaca" />;
export const CardMeminjam = () => <CardPresence title="Meminjam" />;
export const CardLainnya = () => <CardPresence title="Lainnya" />;
