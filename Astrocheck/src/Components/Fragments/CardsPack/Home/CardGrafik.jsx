import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import {NextArrow} from "@/assets/Icons";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const CardGrafik = () => {
  const [sixMonths, setSixMonths] = useState(true);

  const chartData = {
    firstSixMonths: {
      labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni"],
      datasets: [
        {
          label: "Membaca",
          data: [1, 2, 3, 4, 5, 6],
          backgroundColor: "#c0d3f8",
        },
        {
          label: "Meminjam",
          data: [4, 5, 6, 7, 8, 9],
          backgroundColor: "#dce4fb",
        },
        {
          label: "Lainnya",
          data: [7, 8, 9, 10, 11, 12],
          backgroundColor: "#f0f4fd",
        },
      ],
    },
    lastSixMonths: {
      labels: ["Juli", "Agustus", "September", "Oktober", "November", "Desember"],
      datasets: [
        {
          label: "Membaca",
          data: [13, 14, 15, 16, 17, 18],
          backgroundColor: "#c0d3f8",
        },
        {
          label: "Meminjam",
          data: [19, 20, 21, 22, 23, 24],
          backgroundColor: "#dce4fb",
        },
        {
          label: "Lainnya",
          data: [25, 26, 27, 28, 29, 30],
          backgroundColor: "#f0f4fd",
        },
      ],
    },
  };

  const handleSixMonths = () => {
    setSixMonths(!sixMonths);
  };

  return (
    <>
      <div className="px-[15rem] flex justify-center" id="Grafik">
        <div className="rounded-lg flex justify-center items-center gap-5 py-8 bg-white w-[100%] h-[25rem]">
          <Bar
            data={sixMonths ? chartData.firstSixMonths : chartData.lastSixMonths}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                tooltip: {
                  enabled: true,
                },
              },
            }}
          />
          <button
            onClick={handleSixMonths}
            className="rounded-full border-2 w-10 h-10 bg-[#aec9ff] flex justify-center items-center"
          >
            <img
              src={NextArrow}
              alt="next"
              className={`object-contain w-5 h-5 ${sixMonths ? "rotate-180" : "rotate-[360deg]"} duration-[0.7s] ease-in-out`}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default CardGrafik;
