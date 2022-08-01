import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
interface Ibook {
  id?: number;
  name?: string;
}
export default function Reserve() {
  const navigate = useNavigate();
  const [search, setSearch] = useState<Ibook>({});
  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setSearch(w));
  }, []);
  return (
    <div>
      <input
        type={"text"}
        value={search.name}
        placeholder={"BookName"}
        onChange={(e) => {
          setSearch({ ...search, name: e.target.value });
        }}
      />

      <table>
        <tr>
          <th>BookName</th>
          <th>CodeMeli</th>
          <th>DeliveryDate</th>
          <th>ReturnDate</th>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
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
