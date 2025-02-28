import { Doughnut } from "react-chartjs-2"; // Import Doughnut
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


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
      enabled: true, 
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.label}: ${tooltipItem.raw}%`;
        },
      },
    },
  },
};

const DoughnutChart = (props) => {
  const doughnutChartData = {
    labels: props.labels || ["Membaca", "Meminjam", "Lainnya"], 
    datasets: [
      {
        label: "Absen Kegiatan",
        data: props.data,
        backgroundColor: props.colors, 
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
