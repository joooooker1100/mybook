import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
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
  const [publishing, setPublishing] = useState<string>();
  const [nameBook, setNameBook] = useState<string>();
  const [nameAuther, setNameAuther] = useState<string>();
  const [dataPublication, setDataPublication] = useState<string>();
  useEffect(() => {
    fetch("/book")
      .then((w) => w.json())
      .then((w) => setBooks(w));
  }, []);
  console.log(books);

  return (
    <div>
      {books.map((e, index) => {
        return (
          <ul key={index}>
            <button
              onClick={() => {
                const user: Ibook = {
                  name: nameBook,
                  auther: nameAuther,
                  publication: dataPublication,
                  Publishing: publishing,
                };

                setBooks([...books]);
              }}
            >
              mm
            </button>
            <li>{e.name}</li>

            <li>
              {e.publication},{e.Publishing},{e.auther}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
