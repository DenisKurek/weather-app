import { Link } from "react-router-dom";

export default function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "lightblue" }}
    >
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/archive" className="nav-link">
            Archive
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/current" className="nav-link">
            Current
          </Link>
        </li>
      </ul>
    </nav>
  );
}
