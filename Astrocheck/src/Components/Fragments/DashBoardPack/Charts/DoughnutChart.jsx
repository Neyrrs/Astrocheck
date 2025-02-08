import React from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js plugins
ChartJS.register(ArcElement, Tooltip, Legend);

const doughnutChartData = {
  labels: ["Membaca", "Meminjam", "Lainnya"], 
  datasets: [
    {
      label: "Absen Kegiatan",
      data: [60, 60, 40],
      backgroundColor: ["#ff565a", "#24afee", "#ff8c52"], 
      borderColor: "#fff", 
      borderWidth: 2, 
    },
  ],
};

const doughnutChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top", 
      labels: {
        font: {
          size: 11,
        },
      },
    },
    tooltip: {
      enabled: true, // Menampilkan tooltip
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`; // Menampilkan data persentase dalam tooltip
        },
      },
    },
  },
};

const DoughnutChart = () => {
  return (
    <>
      <div className="w-full h-full">
        <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
      </div>
    </>
  );
};

export default DoughnutChart;
