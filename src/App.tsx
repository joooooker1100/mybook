import { useState, useEffect } from "react";
import "./App.css";
interface Ibook {
  id?: number;
  name?: string;
  auther?: string;
  publication?: string;
  Publishing?: string;
}
function App() {
  const [books, setBooks] = useState<Ibook[]>([]);
  const [book, setBook] = useState<Ibook>({});
  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setBooks(w));
  }, []);
  

  return (
    <div>
      <input
        type={"text"}
        placeholder={"name"}
        value={book.name}
        onChange={(e) => {
          setBook({ ...book, name: e.target.value });
        }}
      />
      <input
        type={"text"}
        placeholder={"auther"}
        value={book.auther}
        onChange={(e) => {
          setBook({ ...book, auther: e.target.value });
        }}
      />
      <input
        type={"text"}
        placeholder={"publication"}
        value={book.publication}
        onChange={(e) => {
          setBook({ ...book, publication: e.target.value });
        }}
      />
      <input
        type={"text"}
        placeholder={"Publishing"}
        value={book.Publishing}
        onChange={(e) => {
          setBook({ ...book, Publishing: e.target.value });
        }}
      />
      <button
        onClick={() => {
          if (
            (book.name?.length ?? 0) > 0 &&
            (book.auther?.length ?? 0) > 0 &&
            (book.publication?.length ?? 0) > 0 &&
            (book.Publishing?.length ?? 0) > 0
          ) {
            fetch("/book", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(book),
            })
            .then((w) => w.json())
            .then((w) => setBooks([...books, w]));
            
          }
          setBook({name:'',auther:'',Publishing:'',publication:''});
          
        }}
      >
        save
      </button>
      <table>
        <tr>
          <th>name</th>
          <th>auther</th>
          <th>publication</th>
          <th>Publishing</th>
          <th></th>
          <th></th>
        </tr>

        {books.map((e, index) => {
          return (
            <tr>
              <td className="name">{e.name}</td>
              <td>{e.auther}</td>
              <td>{e.publication}</td>
              <td>{e.Publishing}</td>
              <button
                onClick={() => {
                 

                  fetch(`/book/${e.id}`, {
                    method: "delete",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(book),
                  })
                    .then((w) => w.json())
                    .then((w) => setBooks([...books, w]));
                    books.splice(index, 1);
                    setBooks([...books]);
                }}
              >
                delete
              </button>
              <button>edite</button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
