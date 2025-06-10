import { useState } from "react";
import { useAllPresence } from "@/Hooks/usePresence";

const styleCard =
  "w-full h-fit rounded-lg px-8 flex-col flex justify-center gap-5 pt-10 pb-15 text-white";

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
      <button className="w-fit mt-2 flex items-center gap-3" onClick={handleChange}>
        {labels[presencesIndex]}
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.46799 5.16878C5.55578 5.25667 5.60508 5.37581 5.60508 5.50003C5.60508 5.62424 5.55578 5.74338 5.46799 5.83128L0.780495 10.5188C0.691635 10.6016 0.574107 10.6467 0.452668 10.6445C0.33123 10.6424 0.215364 10.5932 0.129481 10.5073C0.043598 10.4214 -0.00559684 10.3055 -0.00773947 10.1841C-0.00988211 10.0627 0.0351947 9.94513 0.117995 9.85627L4.47424 5.50003L0.117995 1.14378C0.0351947 1.05492 -0.00988211 0.937388 -0.00773947 0.815949C-0.00559684 0.694511 0.043598 0.578646 0.129481 0.492763C0.215364 0.406879 0.33123 0.357684 0.452668 0.355542C0.574107 0.353399 0.691635 0.398476 0.780495 0.481276L5.46799 5.16878Z"
            fill="white"
          />
        </svg>
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
