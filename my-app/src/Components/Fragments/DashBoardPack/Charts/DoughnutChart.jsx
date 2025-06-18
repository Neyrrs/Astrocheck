import { Doughnut } from "react-chartjs-2"; // Import Doughnut
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);



const DoughnutChart = ({title = null, data = [], labels = [], colors = []}) => {
  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title || "Grafik Absen",
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
  const doughnutChartData = {
    labels: labels || ["Membaca", "Meminjam", "Lainnya"], 
    datasets: [
      {
        label: "Absen Kegiatan",
        data,
        backgroundColor: colors, 
        borderColor: "#fff", 
        borderWidth: 2, 
      },
    ],
  };
  return (
    <>
      <div className="w-full h-full">
        <Doughnut options={doughnutChartOptions} data={doughnutChartData} />
      </div>
    </>
  );
};

export default DoughnutChart;
