import { useState, useEffect } from "react";

import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
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
  const [editeBook, setEditeBook] = useState<Ibook>({});
  const [index, setIndex] = useState<number>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setBooks(w));
  }, []);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <input
            type={"text"}
            value={editeBook.name}
            onChange={(e) => {
              setEditeBook({ ...editeBook, name: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeBook.auther}
            onChange={(e) => {
              setEditeBook({ ...editeBook, auther: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeBook.publication}
            onChange={(e) => {
              setEditeBook({ ...editeBook, publication: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeBook.Publishing}
            onChange={(e) => {
              setEditeBook({ ...editeBook, Publishing: e.target.value });
            }}
          />
          <button
            onClick={() => {
              handleClose();
              const edite = {
                name: editeBook.name,
                auther: editeBook.auther,
                Publishing: editeBook.Publishing,
                publication: editeBook.publication,
              };
              books[index!] = edite;
              setBooks([...books]);

              fetch(`/book/${editeBook.id}`, {
                method: "put",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(editeBook),
              })
                .then((w) => w.json())
                .then((w) => {
                  books[index!] = w;
                  setBooks([...books]);
                });
            }}
          >
            Save
          </button>
        </Box>
      </Modal>
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
          setBook({ name: "", auther: "", Publishing: "", publication: "" });
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
                    .then((w) => {
                      books.splice(index, 1);
                      setBooks([...books]);
                    });
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  handleOpen();
                  setEditeBook(e);
                  setIndex(index);
                }}
              >
                edite
              </button>
            </tr>
          );
        })}
      </table>
      <Button onClick={() => {}}> Users</Button>
    </div>
  );
}

export default App;
