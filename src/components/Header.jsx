import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";

const Header = ({ token, setToken }) => {
  return (
    <header>
      <div className="Header_container">
        <Link className="Header_container" to="/">
          <img src={logo} alt="logo game pad" />
        </Link>

        {token ? (
          <div className="headerButton">
            <button> My collection</button>
            <button
              className="headerBut"
              onClick={() => {
                setToken("");
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="headerButton">
            <button> My collection</button>
            <Link className="headerButton" to="/user/login">
              <button> Login</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
