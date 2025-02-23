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

const LineChart = (props) => {

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
        label: "Absen Bulanan",
        data: props.data,
        borderColor: "#2eb1f0",
        backgroundColor : "#2eb1f0",
        pointStyle: "circle", 
        pointRadius: 4,
        pointBackgroundColor: "white",
        borderWidth: 1,
      }
    ]
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

export default LineChart;
