import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface IReserve {
  id?: number;
  codeMeli?: string;
  bookName?: string;
  firstDate?: string;
  lastDate?: string;
}
export default function Reserve() {
  const navigate = useNavigate();
  const [list, setList] = useState<IReserve[]>([]);
  useEffect(() => {
    fetch("/reserve")
      .then((w) => w.json())
      .then((w) => setList(w));
  }, []);
  return (
    <div>
      <table>
        <tr>
          <th>BookName</th>
          <th>CodeMeli</th>
          <th>DeliveryDate</th>
          <th>ReturnDate</th>
        </tr>
        {list.map((e) => {
          return (
            <tr>
              <td>{e.bookName}</td>
              <td>{e.codeMeli}</td>
              <td>{e.firstDate}</td>
              <td>{e.lastDate}</td>
            </tr>
          );
        })}
      </table>
      <button
        onClick={() => {
          return navigate("/");
        }}
      >
        back to Home
      </button>
    </div>
  );
}
