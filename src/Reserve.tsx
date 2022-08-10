import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Chip, emphasize, styled } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
interface IReserve {
  id?: number;
  codeMeli?: string;
  bookName?: string;
  firstDate?: string;
  lastDate?: string;
  returnedDate?: string;
}
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
        کتابهایی که پس گرفته شده اند
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
        کتابهایی که پس گرفته نشده اند
      </button>
      <button
        onClick={() => {
          fetch("/reserve")
            .then((w) => w.json())
            .then((w) => setList(w));
        }}
      >
        کلیه کتابهای امانت داده شده
      </button>
      <br />
      <input
        type={"text"}
        placeholder={"کد ملی"}
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
        :جست و جو از طریق کدملی
      </button>
      <br />
      <input
        type={"text"}
        placeholder={"کتاب"}
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
        :جست و جو از طریق نام کتاب
      </button>
      <table>
        <tr>
          <th></th>
          <th> تاریخ برگشت کتاب</th>
          <th>نام کتاب</th>
          <th>کدملی</th>
          <th>تاریخ تحویل دادن</th>
          <th>تاریخ تحویل گرفتن</th>
        </tr>
        {list.map((e, index) => {
          return (
            <tr>
              <td>
                <button
                  onClick={() => {
                    const edit = {
                      ...list[index],
                      returnedDate: new Date()
                        .toLocaleDateString("fa")
                        .substr(0, 10),
                    };
                    if (window.confirm("آیا مطمئن هستید؟") === true) {
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
                    }
                  }}
                >
                  برگشت داده شد
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
      <Breadcrumbs aria-label="breadcrumb">
        <StyledBreadcrumb
          onClick={() => {
            return navigate("/");
          }}
          label="برگشت به خانه"
          icon={<HomeIcon fontSize="small" />}
        />
      </Breadcrumbs>
    </div>
  );
}
