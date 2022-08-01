import { useState, useEffect } from "react";
import "./App.css";
import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
interface IUser {
  id?: number;
  name?: string;
  lastName?: string;
  codeMeli?: string;
  mobile?: string;
  exp?: string;
}
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
function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [user, setUser] = useState<IUser>({});
  const [editeUser, setEditeUser] = useState<IUser>({});
  const [index, setIndex] = useState<number>();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    fetch("/users")
      .then((w) => w.json())
      .then((w) => setUsers(w));
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
            value={editeUser.name}
            onChange={(e) => {
              setEditeUser({ ...editeUser, name: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeUser.lastName}
            onChange={(e) => {
              setEditeUser({ ...editeUser, lastName: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeUser.codeMeli}
            onChange={(e) => {
              setEditeUser({ ...editeUser, codeMeli: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeUser.mobile}
            onChange={(e) => {
              setEditeUser({ ...editeUser, mobile: e.target.value });
            }}
          />
          <input
            type={"text"}
            value={editeUser.exp}
            onChange={(e) => {
              setEditeUser({ ...editeUser, exp: e.target.value });
            }}
          />
          <button
            onClick={() => {
              handleClose();
              const edite = {
                name: editeUser.name,
                lastName: editeUser.lastName,
                codeMeli: editeUser.codeMeli,
                mobile: editeUser.mobile,
                exp: editeUser.exp,
              };
              users[index!] = edite;
              setUsers([...users]);

              fetch(`/users/${editeUser.id}`, {
                method: "put",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(editeUser),
              })
                .then((w) => w.json())
                .then((w) => {
                  users[index!] = w;
                  setUsers([...users]);
                });
            }}
          >
            Save
          </button>
        </Box>
      </Modal>
      <input
        type={"text"}
        value={user.name}
        placeholder={"name"}
        onChange={(e) => {
          setUser({ ...user, name: e.target.value });
        }}
      />
      <input
        type={"text"}
        value={user.lastName}
        placeholder={"lastName"}
        onChange={(e) => {
          setUser({ ...user, lastName: e.target.value });
        }}
      />
      <input
        type={"text"}
        value={user.codeMeli}
        placeholder={"codeMeli"}
        onChange={(e) => {
          setUser({ ...user, codeMeli: e.target.value });
        }}
      />
      <input
        type={"text"}
        value={user.mobile}
        placeholder={"mobile"}
        onChange={(e) => {
          setUser({ ...user, mobile: e.target.value });
        }}
      />
      <input
        type={"text"}
        value={user.exp}
        placeholder={"EXP"}
        onChange={(e) => {
          setUser({ ...user, exp: e.target.value });
        }}
      />
      <button
        onClick={() => {
          if (
            (user.name?.length ?? 0) > 0 &&
            (user.lastName?.length ?? 0) > 0 &&
            (user.codeMeli?.length ?? 0) > 0 &&
            (user.mobile?.length ?? 0) > 0 &&
            (user.exp?.length ?? 0) > 0
          ) {
            fetch("/users", {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(user),
            })
              .then((w) => w.json())
              .then((w) => setUsers([...users, w]));
          }
          setUser({
            name: "",
            lastName: "",
            codeMeli: "",
            mobile: "",
            exp: "",
          });
        }}
      >
        Save
      </button>

      <table>
        <tr>
          <th>Name</th>
          <th>LastName</th>
          <th>CodeMeli</th>
          <th>Mobile</th>
          <th>EXP</th>
        </tr>
        {users.map((a, index) => {
          return (
            <tr>
              <td>{a.name}</td>
              <td>{a.lastName}</td>
              <td>{a.codeMeli}</td>
              <td>{a.mobile}</td>
              <td>{a.exp}</td>
              <button
                onClick={() => {
                  handleOpen();
                  setEditeUser(a);
                  setIndex(index);
                  setUsers([...users]);
                }}
              >
                Edite
              </button>
              <button
                onClick={() => {
                  fetch(`/users/${a.id}`, {
                    method: "delete",
                    headers: {
                      "content-type": "application/json",
                    },
                    body: JSON.stringify(user),
                  })
                    .then((w) => w.json())
                    .then((w) => {
                      users.splice(index, 1);
                      setUsers([...users]);
                    });
                }}
              >
                Delete
              </button>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
export default Users;
