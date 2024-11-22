import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, Tooltip, Legend);

const ChartsSection = ({ lineChartData, pieChartData }) => {
  return (
    <div className="flex justify-around items-center gap-8">
      {/* Line Chart */}
      <div className="w-[60%] h-[300px] bg-white rounded-md shadow-md p-4">
        <Line data={lineChartData} />
      </div>

      {/* Pie Chart */}
      <div className="w-[30%] h-[300px] bg-white rounded-md shadow-md p-4">
        <Pie data={pieChartData} />
      </div>
    </div>
  );
};

export default ChartsSection;
