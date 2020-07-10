//Header.js is a basic header for the application. It contains conditional rendering
//that will allow the links to display in the Dashboard and Profile view, but not
//the Landing view. This is done using the location.pathname found in react-router-dom
import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./Header.css";

const Header = (props) => {
  // console.log(props)
  return (
    <div className="header-container">
      <h1 className="header-logo">MemeMountain</h1>
      {props.location.pathname !== "/" ? (
        <nav>
          <Link to="/dash" className="nav-links">
            Dashboard
          </Link>
          <Link to="/profile" className="nav-links">
            Profile
          </Link>
        </nav>
      ) : null}
    </div>
  );
};

export default withRouter(Header);
