import { useEffect, useState } from "react";

export default function App() {
  const [ethData, setEthData] = useState([]);

  useEffect(() => {
    let a = setInterval(() => {
      fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
        .then((w) => w.json())
        .then((w) => {
          setEthData(w.price);
        });
    }, 1000);
    return () => {
      clearInterval(a);
    };
  }, []);

  return <div>{ethData}</div>;
}
