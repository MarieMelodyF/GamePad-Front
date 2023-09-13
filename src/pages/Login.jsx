import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/smallLogo.png";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container form-log">
      <div className="col-log-left">
        <img className="form-logo" src={logo} alt="" />
        <h1 className="title-form">How it works ?</h1>

        <div className="icon">
          <i className="fa-regular fa-user"></i>
          <p>
            Log in to your free account to be able to get all features of
            Gamepad
          </p>
        </div>

        <div className="icon">
          <i className="fa-regular fa-bookmark"></i>
          <p>Add a game to your collection</p>
        </div>

        <div className="icon">
          <i className="fa-regular fa-message"></i>
          <p>Leave a review for a game</p>
        </div>
      </div>
      <div className="col-log-right">
        <form
          className="signup-input col-log-right"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                `http://localhost:3000/user/login`,
                {
                  email: email,
                  password: password,
                }
              );

              // console.log("log connexion", response.data);
              // console.log("data.token", response.data.token);
              navigate("/");
              setToken(response.data.token);
              console.log(response.data.token);
            } catch (error) {
              error.response;
              console.log("=>", error.response);
              if (
                error.response.data.message ===
                "Cannot read properties of null (reading 'salt')"
              ) {
                alert(
                  "Vous avez saisi un mauvais mot de passe ou identifiant 🫤. Si vous n'avez pas de compte, merci de vous inscrire"
                );
              } else if (
                error.response.data ===
                "Le mot de passe ou l'identifiant n'est pas correct."
              ) {
                alert(
                  "Vous avez saisi un mauvais mot de passe ou identifiant 🫤. Si vous n'avez pas de compte, merci de vous inscrire"
                );
              }
            }
          }}
        >
          <div>
            <h1>Log In</h1>
          </div>
          <div className="input">
            <input
              className="input"
              type="email"
              placeholder="Email..."
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              className="input"
              type="password"
              placeholder="Password..."
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <input className="input" type="submit" value={"connexion"} />
          </div>
          <Link to="/user/signup">
            <p>Don't have an account yet ? </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
