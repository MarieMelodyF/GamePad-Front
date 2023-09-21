import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = ({ token, setToken }) => {
  const navigate = useNavigate();

  return (
    <header>
      <div className="Header_container">
        <Link className="Header_container" to="/home">
          <img src={logo} alt="logo game pad" />
        </Link>

        {token ? (
          <div className="headerButton">
            <Link to="/allfavorites">
              <button> My collection</button>
            </Link>
            <button
              onClick={() => {
                setToken("");
                navigate(`/home?page=1`);
              }}
            >
              Log Out
            </button>
          </div>
        ) : (
          <div className="headerButton">
            <Link to="/allfavorites">
              <button> My collection</button>
            </Link>
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
