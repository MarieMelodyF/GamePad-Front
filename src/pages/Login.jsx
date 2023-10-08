import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/smallLogo.png";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="container form-log">
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            border: "2px solid #050505",
            padding: "16px",
            backgroundColor: "##d1d1d1",
          },
        }}
      />
      <div className="col-log-left">
        <img className="form-logo" src={logo} alt="" />
        <div className="title-form">
          <h1>How it works ?</h1>
        </div>

        <div className="log-left-int">
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
      </div>
      <div className="col-log-right">
        <form
          className="signup-input col-log-right"
          onSubmit={async (event) => {
            event.preventDefault();
            try {
              const response = await axios.post(
                `https://site--gamepad-back--r2txk865xjj8.code.run/user/login`,
                {
                  email: email,
                  password: password,
                }
              );

              // console.log("log connexion", response.data);
              // console.log("data.token", response.data.token);
              navigate("/");
              setToken(response.data.token);
              // console.log("login", response.data.token);
              // console.log(response.data.token);
            } catch (error) {
              error.response;
              console.log("=>", error.response);
              if (
                error.response.data.message ===
                "Cannot read properties of null (reading 'salt')"
              ) {
                toast.error(
                  "Vous avez saisi un mauvais mot de passe ou identifiant 🫤."
                );
              } else if (
                error.response.data ===
                "Le mot de passe ou l'identifiant n'est pas correct."
              ) {
                toast.error(
                  "Vous avez saisi un mauvais mot de passe ou identifiant 🫤."
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
          <Link className="login" to="/user/signup">
            <p className="login">Don't have an account yet ? </p>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
