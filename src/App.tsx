import { useEffect, useState } from "react";
import twelvedata from "twelvedata";

export default function App() {
  const [ethData, setEthData] = useState([]);
  const config = {
    key: "3e9efaf9297541cba9bc6da6d7351782",
  };
  useEffect(() => {
    let a = setInterval(() => {
      const client = twelvedata(config);
      client
        .timeSeries({ symbol: "BTC/USD", interval: "1min", outputsize: 1 })
        .then((data) => {
          console.log(data);
          setEthData(data.values);
        });
    }, 60000);
    return () => {
      clearInterval(a);
    };
  });

  return (
    <div>
      {ethData.map((w: any) => {
        return (+w.close).toLocaleString("en-US", { maximumFractionDigits: 5 });
      })}
    </div>
  );
}
