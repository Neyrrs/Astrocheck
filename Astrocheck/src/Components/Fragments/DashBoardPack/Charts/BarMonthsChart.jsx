import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import React from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const BarMonthsChart = ({ data = [], labels = [], title = null}) => {

  const barChartData = {
    labels : labels || defaultLabels,
    datasets: [
      {
        label: title,
        data: data || [],
        backgroundColor: "#98bddf",
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Bar data={barChartData} options={options} />
    </div>
  );
};

export default BarMonthsChart;
