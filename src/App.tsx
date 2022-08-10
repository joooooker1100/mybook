import { useState } from "react";
import twelvedata from "twelvedata";
export default function App(obj: any) {
  const config = {
    key: "47d4013b04a5446da43b62888daf57c3",
  };
  const client = twelvedata(config);
  client
    .timeSeries({ symbol: "ETH/BTC", interval: "1min", outputsize: 5 })
    .then((data) => {})
    .catch((error) => {
      // handle error
    });

  let data = [];
  for (const key in obj) {
    const element = obj[key];
    data.push(element);
  }
  return data.map((x, index) => ({
    index,
    open: +x.open,
    close: +x.close,
    high: +x.high,
    low: +x.low,
    color: +x.close - +x.open > 0 ? "green" : "red",
    time: x.datetime,
    ts: (new Date(x.datetime).getTime() / 1000).toFixed(),
  }));
}
