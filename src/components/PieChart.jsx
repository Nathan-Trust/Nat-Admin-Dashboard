import { Pie } from "react-chartjs-2";
import { Chart as ChartJs } from "chart.js/auto";
import { UserData } from "../data/UserTableData";
import { useState } from "react"
import { useStateContext } from "../contexts/ContextProvider";


const PieChart = () => {
  const {currentColor} = useStateContext()
    const [userData, setUserData] = useState({
      labels: UserData.map((data) => data.year),
      datasets: [
        {
          label: "Users Lost",
          data: UserData.map((data) => data.userLost),
          backgroundColor: currentColor,
          borderRadius: 3,
          barThickness: 20,
          barPercentage: 0.8, // Adjust the width of the bars (default is 0.9)
          categoryPercentage: 0.7, // Adjust the spacing between bars (default is 0.8)
        },
      ],
    });
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
    <div >
      <Pie data={userData} options={options} />
    </div>
  );
};

export default PieChart;
