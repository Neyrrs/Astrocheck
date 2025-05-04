import { useState, useEffect } from "react";
import { useAllPresence } from "@/Hooks/usePresence";

const styleCard =
  "w-90 h-fit rounded-lg px-8 flex-col flex justify-center gap-5 pt-10 pb-15 text-white";

const usePresenceData = (category) => {
  const { fullYear, presence } = useAllPresence();
  const [presencesIndex, setPresencesIndex] = useState(0);
  const [currentMonthData, setCurrentMonthData] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const data = fullYear?.logsPerMonth || [];
      const currentMonth = new Date().getMonth() + 1;
      const currentMonthStr = currentMonth.toString().padStart(2, "0");
      const currentData = data.find((item) => item.month === currentMonthStr);
      setCurrentMonthData(currentData?.[category] || 0);
    };
    fetchData();
  }, [fullYear, category]);

  const handleChange = () => {
    setPresencesIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
  };

  return {
    presencesIndex,
    handleChange,
    presenceData: [
      presence?.[category] || 0, 
      currentMonthData, 
      fullYear?.[category] || 0, 
    ],
    labels: ["Hari ini", "Bulan ini", "Tahun ini"],
  };
};

const CardPresence = ({ title, category }) => {
  const { presencesIndex, handleChange, presenceData, labels } =
    usePresenceData(category);

  return (
    <div className={`${title} ${styleCard}`}>
      <div className="flex flex-col gap-2">
        <p className="text-base">Absen {title}</p>
        <p className="text-3xl font-semibold">{presenceData[presencesIndex]} Orang</p>
      </div>
      <button className="w-fit" onClick={handleChange}>
        {labels[presencesIndex]} -
      </button>
    </div>
  );
};

export const CardMembaca = () => <CardPresence title="Membaca" category="membaca" />;
export const CardMeminjam = () => <CardPresence title="Meminjam" category="meminjam" />;
export const CardLainnya = () => <CardPresence title="Lainnya" category="lainnya" />;
