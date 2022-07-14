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
            <li
              onClick={() => {
                return (
                  <li>
                    {e.Publishing},{e.auther},{e.publication}
                  </li>
                );
              }}
            >
              {e.name}
            </li>
          </ul>
        );
      })}
    </div>
  );
}

export default App;
