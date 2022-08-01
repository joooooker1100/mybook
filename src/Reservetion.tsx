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
  const navigate = useNavigate();
  const [books, setBooks] = useState<Ibook[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
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
      <select name="books" id="books">
        {books.map((e) => {
          return <option value={e.name}>{e.name}</option>;
        })}
      </select>
      <br />
      <br />
      <label htmlFor="Users">Choose a User:</label>
      <select name="Users" id="Users">
        {users.map((e) => {
          return <option value={e.codeMeli}>{e.codeMeli}</option>;
        })}
      </select>
      <br />
      <br />
      <label>DeliveryDate:</label>
      <input type={"date"} value={new Date().toISOString().substr(0, 10)} />
      <br />
      <br />
      <label>ReturnDate:</label>
      <input type={"date"} />
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
