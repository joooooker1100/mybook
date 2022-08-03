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
          <th>returned</th>
          <th>BookName</th>
          <th>CodeMeli</th>
          <th>DeliveryDate</th>
          <th>ReturnDate</th>
        </tr>
        {list.map((e, index) => {
          return (
            <tr>
              <td>
                <button
                  onClick={() => {
                    const edit = {
                      ...list[index],
                      returnedDate: new Date().toISOString().substr(0, 10),
                    };
                    if (window.confirm("Are you sure?") === true) {
                      fetch(`/reserve/${edit.id}`, {
                        method: "put",
                        headers: {
                          "content-type": "application/json",
                        },
                        body: JSON.stringify(edit),
                      })
                        .then((w) => w.json())
                        .then((w) => {
                          list[index!] = w;
                          setList([...list]);
                        });
                    } else {
                      window.alert("You canceled!");
                    }
                  }}
                >
                  returned
                </button>
              </td>
              <td>{e.returnedDate}</td>
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
