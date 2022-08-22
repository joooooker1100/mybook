import React, { useEffect, useState } from "react";

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
import { Line } from "react-chartjs-2";
import twelvedata from "twelvedata";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const faker = [100, 2000, 300, 400, 5050, 600, 7004, 800, 9050];
console.log(labels.map(() => faker));

export default function App() {
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map((w) => w.close),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y",
      },
    ],
  };
  const [ethData, setEthData] = useState([]);
  const config = {
    key: "3e9efaf9297541cba9bc6da6d7351782",
  };
  useEffect(() => {
    let a = setInterval(() => {
      const client = twelvedata(config);
      client
        .timeSeries({ symbol: "BTC/USD", interval: "5min", outputsize: 20 })
        .then((data) => {
          console.log(data);
          setEthData(data.values);
        });
    }, 60000);
    return () => {
      clearInterval(a);
    };
  });
  return <Line data={data} />;
}
