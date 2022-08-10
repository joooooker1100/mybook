import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function home() {
  const style = {
    width: "100%",
    maxWidth: 360,
    bgcolor: "background.paper",
  };

  return (
    <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button>
        <Link to="/Books">کتاب ها</Link>
      </ListItem>
      <Divider />
      <ListItem button divider>
        <Link to="/Users">کاربران</Link>
      </ListItem>
      <ListItem button>
        <Link to="/Reserve">لیست کتابهای رزرو شده</Link>
      </ListItem>
      <Divider light />
      <ListItem button>
        <Link to="/Reservetion">رزرو کتاب</Link>
      </ListItem>
    </List>
  );
}
