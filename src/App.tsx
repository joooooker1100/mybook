// import React, { useEffect, useState } from "react";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";
// import twelvedata from "twelvedata";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );
// export default function App() {
//   const [ethData, setEthData] = useState([]);
//   const config = {
//     key: "3e9efaf9297541cba9bc6da6d7351782",
//   };
//   useEffect(() => {
//     let a = setInterval(() => {
//       const client = twelvedata(config);
//       client
//         .timeSeries({ symbol: "BTC/USD", interval: "5min", outputsize: 20 })
//         .then((data) => {
//           console.log(data);
//           setEthData(data.values);
//         });
//     }, 60000);
//     return () => {
//       clearInterval(a);
//       console.log(ethData.map((w: any) => w.close));
//     };
//   });
//   const data = {
//     datasets: [
//       {
//         label: "BTC",
//         data: ethData.map((w: any) => w.close),
//         borderColor: "rgb(255, 99, 132)",
//         backgroundColor: "rgba(255, 99, 132, 0.5)",
//         yAxisID: "y",
//       },
//     ],
//   };
//   return <Line data={data} />;
// }
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

export const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: "Chart.js Line Chart - Multi Axis",
    },
  },
  scales: {
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

export default function App() {
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
      console.log(ethData.map((w: any) => w.close));
    };
  });
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const faker2 = [2, 6, 8, 9, 7, 1, 6];
  const data = {
    labels,
    datasets: [
      {
        label: "BTC",
        data: labels.map(() =>
          ethData.map((w) => {
            w;
          })
        ),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        yAxisID: "y1",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
