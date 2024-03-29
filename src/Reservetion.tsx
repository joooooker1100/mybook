import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
}) as typeof Chip; // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

function handleClick(event: React.MouseEvent<Element, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function Reservetion() {
  interface Ibook {
    id?: number;
    name?: string;
    lastDate?: string;
    bookName?: string;
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
  interface AutocompleteOption {
    label: string;
  }

  const navigate = useNavigate();
  const [books, setBooks] = useState<Ibook[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
  const [reserve, setReserve] = useState<IReserve>({});
  const [reserves, setReserves] = useState([]);
  const options = [books];
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
  useEffect(() => {
    fetch("/reserve")
      .then((w) => w.json())
      .then((w) => setReserves(w));
  }, [reserve.bookName, reserve.codeMeli]);

  return (
    <div>
      <label htmlFor="books">انتخاب کتاب:</label>
      <select
        name="books"
        id="books"
        value={reserve.bookName}
        onChange={(f) => {
          const filterDate = reserves.filter((e: IReserve) => {
            return !e.returnedDate && e.bookName === f.target.value;
          });
          console.log(filterDate);
          if (filterDate.length === 0) {
            setReserve({ ...reserve, bookName: f.target.value });
          } else {
            window.alert("کتاب مورد نظر در دسترس نیست!");
          }
        }}
      >
        {books.map((e, index) => {
          return (
            <option key={index + "pep"} value={e.name}>
              {e.name}
            </option>
          );
        })}
      </select>
      <br />
      <br />
      <label htmlFor="Users">انتخاب کاربر:</label>
      <select
        name="Users"
        id="Users"
        value={reserve.codeMeli}
        onChange={(f) => {
          const filterCodeMeli = reserves.filter((e: IReserve) => {
            return e.codeMeli === f.target.value && !e.returnedDate;
          });
          console.log(filterCodeMeli);
          if (filterCodeMeli.length === 0) {
            setReserve({ ...reserve, codeMeli: f.target.value });
          } else {
            window.alert("کاربر مورد نظر مجاز نمیباشد!");
          }
        }}
      >
        {users.map((e) => {
          return <option value={e.codeMeli}>{e.codeMeli}</option>;
        })}
      </select>
      <br />
      <br />

      <label>تاریخ تحویل:</label>
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
          if (
            (reserve.bookName?.length ?? 0) > 0 &&
            (reserve.codeMeli?.length ?? 0) > 0 &&
            (reserve.lastDate?.length ?? 0) > 0
          ) {
            fetch("/reserve", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                ...reserve,
                firstDate: new Date().toLocaleDateString("fa").substr(0, 10),
              }),
            })
              .then((w) => w.json())
              .then((w) => setBooks([...books, w]));
          }
          setReserve({
            bookName: "",
            codeMeli: "",
            lastDate: "",
          });
        }}
      >
        ذخیره
      </button>

      <br />
      <br />
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          onClick={() => {
            return navigate("/");
          }}
          label="برگشت به خانه"
          icon={<HomeIcon fontSize="small" />}
        />
      </Breadcrumbs>
      <Outlet />
    </div>
  );
}
