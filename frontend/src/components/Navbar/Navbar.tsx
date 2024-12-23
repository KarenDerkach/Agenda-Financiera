import { Link } from "react-router-dom";
import Main from "../User/Main";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light "
      style={{ backgroundColor: "#D1E2C4" }}
    >
      <Link to="/" className="navbar-brand">
        {" "}
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link to="/weather" className="nav-link">
              Weather
            </Link>
          </li>
          <li className="nav-item active">
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cheques" className="nav-link">
              {" "}
              CheckBook
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/calculator" className="nav-link">
              {" "}
              Calculator
            </Link>
          </li>
        </ul>
      </div>
      <div className="login-secction">
        <ul className="nav navbar-nav">
          <li>
            <Main />
          </li>
        </ul>
      </div>
    </nav>
  );
}
