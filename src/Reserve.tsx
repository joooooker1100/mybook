import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface IReserve {
  id?: number;
  codeMeli?: string;
  bookName?: string;
  firstDate?: string;
  lastDate?: string;
  returnedDate?: string;
}
export default function Reserve() {
  const [editeList, setEditeList] = useState<IReserve>({});
  const [index, setIndex] = useState<number>();
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
          <th></th>
          <th>BookName</th>
          <th>CodeMeli</th>
          <th>DeliveryDate</th>
          <th>ReturnDate</th>
        </tr>
        {list.map((e) => {
          return (
            <tr>
              <td>
                <button
                  onClick={() => {
                    const edite = {
                      bookName: editeList.bookName,
                      codeMeli: editeList.codeMeli,
                      lastDate: editeList.lastDate,
                      firstDate: editeList.firstDate,
                    };
                    list[index!] = edite;
                    setList([...list]);
                    fetch(`/reserve/${editeList.id}`, {
                      method: "put",
                      headers: {
                        "content-type": "application/json",
                      },
                      body: JSON.stringify(editeList),
                    })
                      .then((w) => w.json())
                      .then((w) => {
                        list[index!] = w;
                        setList([...list]);
                      });
                  }}
                ></button>
              </td>
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
