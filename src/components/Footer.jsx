import React from "react";
import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Footer = ({ token, setToken }) => {
  return (
    <footer>
      <div className="footer ">
        <div className="logo-footer">
          <img src={logo} alt="logo gamepad" />
        </div>
        <div className="text-footer">
          <div className="byme">
            <p>Created by MMF at Le Reacteur</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
