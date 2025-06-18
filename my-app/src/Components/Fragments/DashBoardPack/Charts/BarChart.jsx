import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = () => {
  const barChartData = {
    labels: ["RA", "RAB", "RAC", "RAD", "RAE", "RAF", "RAG", "RAH"],
    datasets: [
      {
        label: "Ruangan",
        data: [60, 30, 10, 90, 86, 34, 34, 43],
        backgroundColor: "#98bddf",
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <>
      <div className="w-full h-full">
        <Bar data={barChartData} options={options} />
      </div>
    </>
  );
};

export default BarChart;
