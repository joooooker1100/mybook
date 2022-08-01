import { Link, Outlet } from "react-router-dom";

export default function home() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/Books">Books</Link>
          </li>
          <li>
            <Link to="/Users">Users</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
}
