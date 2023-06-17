import { Link, useRouteLoaderData } from "react-router-dom";
import { Form } from "react-router-dom";

export default function Navbar(props) {
  const token = useRouteLoaderData("root");

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "lightblue" }}
    >
      <ul className="navbar-nav">
        {token && (
          <li className="nav-item">
            <Link to="/archive" className="nav-link">
              Archive
            </Link>
          </li>
        )}
        {token && (
          <li className="nav-item">
            <Link to="/current" className="nav-link">
              Current
            </Link>
          </li>
        )}
        {token && (
          <li className="nav-item">
            <Form action="/logout" method="post">
              <button className="nav-link">Logout</button>
            </Form>
          </li>
        )}
        {!token && (
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
