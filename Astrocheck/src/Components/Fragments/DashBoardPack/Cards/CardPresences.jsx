import { useState } from "react";
import { useAllPresence } from "@/Hooks/usePresence";

const styleCard =
  "w-90 h-fit rounded-lg px-8 flex-col flex justify-center gap-5 pt-10 pb-15 text-white";

const usePresenceData = (category) => {
  const { summary } = useAllPresence();
  const [presencesIndex, setPresencesIndex] = useState(0);

  const handleChange = () => {
    setPresencesIndex((prevIndex) => (prevIndex < 2 ? prevIndex + 1 : 0));
  };

  return {
    presencesIndex,
    handleChange,
    presenceData: [
      summary?.daily?.[category] || 0,   
      summary?.monthly?.[category] || 0, 
      summary?.yearly?.[category] || 0,  
    ],
    labels: ["Hari ini", "Bulan ini", "Tahun ini"],
  };
};

// Komponen utama card presensi
const CardPresence = ({ title, category }) => {
  const { presencesIndex, handleChange, presenceData, labels } =
    usePresenceData(category);

  return (
    <div className={`${title} ${styleCard}`}>
      <div className="flex flex-col gap-2">
        <p className="text-base font-normal">Absen {title}</p>
        <p className="text-3xl font-semibold">
          {presenceData[presencesIndex]} Orang
        </p>
      </div>
      <button className="w-fit mt-2" onClick={handleChange}>
        {labels[presencesIndex]} -
      </button>
    </div>
  );
};

export const CardMembaca = () => (
  <CardPresence title="Membaca" category="membaca" />
);
export const CardMeminjam = () => (
  <CardPresence title="Meminjam" category="meminjam" />
);
export const CardLainnya = () => (
  <CardPresence title="Lainnya" category="lainnya" />
);
