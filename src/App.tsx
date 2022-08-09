import { useState, useEffect } from "react";
import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import { Outlet, useNavigate } from "react-router-dom";
import {
  Button,
  ButtonGroup,
  Fab,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import NavigationIcon from "@mui/icons-material/Navigation";
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
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === 'light'
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');}
function App() {
  const navigate = useNavigate();
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
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-name"
          label="Name"
          value={book.name}
          onChange={(e) => {
            setBook({ ...book, name: e.target.value });
          }}
        />
        <TextField
          id="outlined-name"
          label="auther"
          value={book.auther}
          onChange={(e) => {
            setBook({ ...book, auther: e.target.value });
          }}
        />
        <TextField
          id="outlined-name"
          label="publication"
          value={book.publication}
          onChange={(e) => {
            setBook({ ...book, publication: e.target.value });
          }}
        />
        <TextField
          id="outlined-name"
          label="Publishing"
          value={book.Publishing}
          onChange={(e) => {
            setBook({ ...book, Publishing: e.target.value });
          }}
        />
        <Fab
          variant="extended"
          size="small"
          color="primary"
          aria-label="add"
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
          <NavigationIcon sx={{ mr: 1 }} />
          Save
        </Fab>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">auther</TableCell>
              <TableCell align="center">publication</TableCell>
              <TableCell align="center">Publishing</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((e, index) => (
              <TableRow key={e.name} sx={{ " &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" align="center">
                  {e.name}
                </TableCell>
                <TableCell align="center">{e.auther}</TableCell>
                <TableCell align="center">{e.publication}</TableCell>
                <TableCell align="center">{e.Publishing}</TableCell>
                <ButtonGroup
                  variant="contained"
                  aria-label="outlined primary button group"
                >
                  <Button  onClick={() => {
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
                  }}>Delete</Button>
                  <Button  onClick={() => {
                    handleOpen();
                    setEditeBook(e);
                    setIndex(index);
                  }}>Edit</Button>
                </ButtonGroup>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          onClick={() => {
            return navigate("/");
          }}
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        
      </Breadcrumbs>
      <Outlet />
    </div>
  );
}

export default App;
