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
  const [searchCodeMeli, setSearchCodeMeli] = useState<any>();
  const [searchNameBook, setSearchNameBook] = useState<any>();
  useEffect(() => {
    fetch("/reserve")
      .then((w) => w.json())
      .then((w) => setList(w));
  }, []);
  return (
    <div>
      <button
        onClick={() => {
          const filteredreserve = list.filter((e) => {
            return e.returnedDate;
          });
          console.log(filteredreserve);
          setList([...filteredreserve]);
        }}
      >
        ReturnResereve
      </button>
      <button
        onClick={() => {
          const filteredNotReserves = list.filter((e) => {
            return !e.returnedDate;
          });
          console.log(filteredNotReserves);
          setList([...filteredNotReserves]);
        }}
      >
        NotReturnResereve
      </button>
      <button
        onClick={() => {
          fetch("/reserve")
            .then((w) => w.json())
            .then((w) => setList(w));
        }}
      >
        AllReserve
      </button>
      <br />
      <input
        type={"text"}
        placeholder={"CodeMeli"}
        onChange={(e) => {
          setSearchCodeMeli(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const filterCodeMeli = list.filter((e) => {
            return e.codeMeli === searchCodeMeli;
          });
          console.log(searchCodeMeli);
          setList([...filterCodeMeli]);
        }}
      >
        search width CodeMeli
      </button>
      <br />
      <input
        type={"text"}
        placeholder={"NameBook"}
        onChange={(e) => {
          setSearchNameBook(e.target.value);
        }}
      />
      <button
        onClick={() => {
          const filterNameBook = list.filter((e) => {
            return e.bookName
              ?.toLocaleLowerCase()
              .includes(searchNameBook.toLocaleLowerCase());
          });
          setList([...filterNameBook]);
        }}
      >
        search width NameBook
      </button>
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
