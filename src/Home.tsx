
import { List, ListItem, ListItemText, Divider } from "@mui/material";
import { Link, Outlet } from "react-router-dom";


export default function home() {
  const style = {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  };

  
  return (
    
          <List sx={style} component="nav" aria-label="mailbox folders">
      <ListItem button >
      <Link to="/Books">Books</Link>
      </ListItem>
      <Divider />
      <ListItem button divider>
      <Link to="/Users">Users</Link>
      </ListItem>
      <ListItem button>
      <Link to="/Reserve">Reserve</Link>  
      </ListItem>
      <Divider light />
      <ListItem button>
      <Link to="/Reservetion">Reservetion</Link>
      </ListItem>
    </List>
      


    
  );

};


