import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Reservetion() {
  interface Ibook {
    id?: number;
    name?: string;
  }
  interface IUser {
    id?: number;
    codeMeli?: string;
  }
  interface IReserve {
    id?: number;
    codeMeli?: string;
    bookName?: string;
    firstDate?: string;
    lastDate?: string;
    returnedDate?: string;
  }
  const navigate = useNavigate();
  const [books, setBooks] = useState<Ibook[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [reserve, setReserve] = useState<IReserve>({});
  
  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setBooks(w));
  }, []);
  useEffect(() => {
    fetch("/users")
      .then((w) => w.json())
      .then((w) => setUsers(w));
  }, []);
  return (
    <div>
      <label htmlFor="books">Choose a book:</label>
      <select
        name="books"
        id="books"
        value={reserve.bookName}
        onChange={(f) => {
          fetch("/reserve")
            .then((w) => w.json())
            .then((w) => {
              const filterDate = w.filter((e: IReserve) => {
                return e.returnedDate && e.bookName === f.target.value;
              });
              console.log(f.target.value);
              if (filterDate===null) {
                setReserve({ ...reserve, bookName: f.target.value });
              } else {
                window.alert("Not available!")
              }
              
            });
        }}
      >
        {books.map((e) => {
          return <option value={e.name}>{e.name}</option>;
        })}
      </select>
      <br />
      <br />
      <label htmlFor="Users">Choose a User:</label>
      <select
        name="Users"
        id="Users"
        value={reserve.codeMeli}
        onChange={(e) => {
          setReserve({ ...reserve, codeMeli: e.target.value });
        }}
      >
        {users.map((e) => {
          return <option value={e.codeMeli}>{e.codeMeli}</option>;
        })}
      </select>
      <br />
      <br />

      <label>ReturnDate:</label>
      <input
        type={"date"}
        value={reserve.lastDate}
        onChange={(e) => {
          setReserve({ ...reserve, lastDate: e.target.value });
        }}
      />
      <br />
      <br />
      <button
        onClick={() => {
          {
            fetch("/reserve", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                ...reserve,
                firstDate: new Date().toISOString().substr(0, 10),
              }),
            })
              .then((w) => w.json())
              .then((w) => setBooks([...books, w]));
          }
        }}
      >
        Save
      </button>

      <br />
      <br />
      <button
        onClick={() => {
          return navigate("/");
        }}
      >
        back to Home
      </button>
      <Outlet />
    </div>
  );
}
