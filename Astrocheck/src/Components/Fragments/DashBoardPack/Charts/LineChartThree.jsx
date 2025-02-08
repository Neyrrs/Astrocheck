import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartThree = () => {
  const lineChartDatas = {
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
    datasets: [
      {
        label: "Hari ini",
        data: [1, 2, 3, 4, 5, 6, 7, 89, 23, 43, 23, 58],
        borderColor: "#2eb1f0",
        backgroundColor: "#2eb1f0",
        pointStyle: "circle",
        pointRadius: 4,
        pointBackgroundColor: "white",
        borderWidth: 1,
      },
      {
        label: "Minggu ini",
        data: [1, 90, 23, 23, 58, 2, 7, 50, 12, 32, 23],
        borderColor: "#5f6eee",
        backgroundColor: "#5f6eee",
        pointStyle: "circle",
        pointRadius: 4,
        pointBackgroundColor: "white",
        borderWidth: 1,
      },
      {
        label: "Bulan ini",
        data: [50, 10, 23, 5, 23, 70, 15, 24, 76, 45, 30],
        borderColor: "#00f272",
        backgroundColor: "#00f272",
        pointStyle: "circle",
        pointRadius: 4,
        pointBackgroundColor: "white",
        borderWidth: 1,
      },
      {
        label: "Minggu ini",
        data: [20, 50, 45, 34, 23, 10, 20, 30, 23, 45, 10],
        borderColor: "#ff5c5c",
        backgroundColor: "#ff5c5c",
        pointStyle: "circle",
        pointRadius: 4,
        pointBackgroundColor: "white",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full h-full">
      <Line options={options} data={lineChartDatas} />
    </div>
  );
};

export default LineChartThree;
