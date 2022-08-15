import { useEffect, useState } from "react";
import twelvedata from "twelvedata";

export default function App() {
  const [ethData, setEthData] = useState([]);
  const config = {
    key: "47d4013b04a5446da43b62888daf57c3",
  };
  useEffect(() => {
    const client = twelvedata(config);
    client
      .timeSeries({ symbol: "ETH/BTC", interval: "1min", outputsize: 1 })
      .then((data) => {
        setEthData(data.values);
      })
      .catch((error) => {
        // handle error
      });
  }, []);

  return (
    <div>
      {ethData.map((w: any) => {
        return w.close;
      })}
    </div>
  );
}
