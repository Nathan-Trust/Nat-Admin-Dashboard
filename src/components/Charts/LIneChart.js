import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement);

const LineChart = () => {
  const [chart, setChart] = useState([]);
  var baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  var apiKey = "coinranking428725e9a350a1dfb4379bc17fe7ae75b998595d7fc65b31";
    const [data, setData] = useState({
      labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
      datasets: [
        {
          data: [186, 205, 1321, 1516, 2107, 2191, 3133, 3221, 4783, 5478],
          label: "America",
          fill: false,
          backgroundColor: [
            "rgba(255,99,132,0.2)",
            "rgba(54,162,235,0.2)",
            "rgba(255, 206,86,0.2)",
            "rgba(75,192,192,0.2)",
            "rgba(153,102,255,0.2)",
            "rgba(255,159,64,0.2)",
          ],
          borderColor: [
            "rgba(255,99,132,0.2)",
            "rgba(54,162,235,0.2)",
            "rgba(255, 206,86,0.2)",
            "rgba(75,192,192,0.2)",
            "rgba(153,102,255,0.2)",
            "rgba(255,159,64,0.2)",
          ],
          borderWidth: 1,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          data: [1282, 1350, 2411, 2502, 2635, 2809, 3947, 4402, 3700, 5267],
          label: "Europe",
          borderColor: "#e43202",
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
        {
          data: [1302, 1310, 231, 2592, 2435, 3709, 4047, 4102, 3900, 5867],
          label: "Asia",
          borderColor: "blue",
          fill: false,
          tension: 0.4,
          pointRadius: 0,
        },
        // {
        //   data: [1002, 1210, 2431, 2102, 2935, 3259, 3447, 2182, 3990, 5167],
        //   label: "Oceania",
        //   borderColor: "cyan",
        //   fill: false,
        //   tension: 0.4,
        //   pointRadius: 0,
        // },
        // {
        //   data: [2302, 4310, 5231, 2132, 2105, 3109, 4847, 3402, 3100, 5820],
        //   label: "Africa",
        //   borderColor: "green",
        //   fill: false,
        //   tension: 0.4,
        //   pointRadius: 0,
        // },
        // {
        //   data: [2102, 3310, 2531, 4592, 3035, 2199, 3347, 2302, 4800, 1267],
        //   label: "Antartica",
        //   borderColor: "black",
        //   fill: false,
        //   tension: 0.4,
        //   pointRadius: 0,
        // },
      ],
    });

  useEffect(() => {
    const fetchCoins = async () => {
      await fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${apiKey}`,
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((res) => {
          res.json().then((json) => {
            setChart(json);
            console.log(json);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchCoins();
  }, [baseUrl, proxyUrl, apiKey]);




  useEffect(() => {
    // Function to update chart data with new random data
    const updateChartData = () => {
      setData((prevData) => ({
        ...prevData,
        datasets: prevData.datasets.map((dataset) => ({
          ...dataset,
          data: dataset.data.map(() => Math.floor(Math.random() * 5000)),
        })),
      }));
    };

    // Update the chart data every 1 minute (60000 milliseconds)
    const interval = setInterval(updateChartData, 15000);

    return () => {
      clearInterval(interval);
    };
  }, []);


  var options = {
    title: {
      display: true,
      text: "Chart JS Line Chart Example",
    },
  };

 /*  var options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    lengend: {
      labels: {
        fontSize: 26,
      },
    },
  }; */

  return (
    <div>
      <Line height={400} data={data} options={options} />
    </div>
  );
};

export default LineChart;
