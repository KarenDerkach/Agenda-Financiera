import { Link } from "react-router-dom";
import "./Menu.css";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

export default function Menu() {
  return (
    <div className="bkg-main">
      <div className="menu-container">
        <h1 className="menu-title">QuickTask Planner</h1>

        <h4 className="sub-title-menu">What can you find here?</h4>

        <ul className="list-items">
          <li className="item-menu">
            <Link to="/weather">
              {" "}
              <IoMdCheckmarkCircleOutline className="icon-check" /> Visualize
              the weather in your area
            </Link>
          </li>
          <li className="item-menu">
            {" "}
            <Link to="/calendar">
              <IoMdCheckmarkCircleOutline className="icon-check" /> Calendar
              service
            </Link>
          </li>
          <li className="item-menu">
            {" "}
            <Link to="/cheques">
              <IoMdCheckmarkCircleOutline className="icon-check" /> Checkbook
              service{" "}
            </Link>
          </li>
          <li className="item-menu">
            {" "}
            <Link to="/calculator">
              <IoMdCheckmarkCircleOutline className="icon-check" /> Calculator
              service{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
