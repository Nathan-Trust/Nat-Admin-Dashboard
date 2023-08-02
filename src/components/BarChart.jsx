import {Bar} from "react-chartjs-2"
import { Chart as ChartJs} from "chart.js/auto"
const BarChart = ({chartData}) => {
  const options = {
    scales: {
      x: {
        grid: {
          display: false, // Set to false to remove x-axis gridlines
        },
      },
      y: {
        grid: {
          display: false, // Set to false to remove y-axis gridlines
        },
      },
    },
  };
  return (
    <div className="bar-chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default BarChart