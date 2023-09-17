import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../images/smallLogo.png";

const Signup = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [imgCloudinary, setImgCloudinary] = useState("");
  const [avatar_user, setAvatar_user] = useState({});

  const [sowhErrorMessage, setSowhErrorMessage] = useState(false);

  const handleUsername = (event) => {
    let value = event.target.value;
    setUsername(value);
  };

  const handleEmail = (event) => {
    let value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    let value = event.target.value;
    setPassword(value);
  };

  const handlePassword2 = (event) => {
    let value = event.target.value;
    setPassword2(value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      console.log(avatar_user);
      setSowhErrorMessage(false);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      formData.append("avatar", avatar_user);

      // console.log("data", data);
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData
      );
      console.log("res.data =>", response.data);
      //   console.log("data2 =>", data);
      const token = response.data.token;
      // setAvatar_user(response.data.avatar_user.secure_url);
      setToken(token);
      if (password === password2 && username !== "" && email !== "") {
        alert("Your account is created ✨");
      } else {
        if (password !== password2) {
          setSowhErrorMessage(true);
        }
        if (username === "") {
          alert("Please enter a User name 💻 !");
        }
        if (email === "") {
          alert("Please enter mail adress 📧 !");
        }

        if (password2 === "") {
          alert("Please confirme your password");
        }
      }
      navigate(`/`);
    } catch (error) {
      //   console.log("==>", error.message);
      if (error.message.data === "Email already exist ! Use your account 🚀") {
        // setErrorMessage("Email already exist ! Use your account 🚀");
        alert("Email already exist ! Use your account 🚀");
      } else if (
        error.response.data.message ===
        "This username already exist ! Choose another username 🤟🏼 !"
      ) {
        alert("This username already exist ! Choose another username 🤟🏼 !");
      }
    }
  };
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
        <form>
          <div className="top-form">
            <div className="right-form">
              <h1>Register now</h1>
            </div>
            <div className="col-log-right2">
              <input
                className="user input2"
                onChange={handleUsername}
                type="text"
                name="username"
                id="MasterChief"
                value={username}
                placeholder="Master Chief "
              />
              <input
                className="user input2"
                onChange={handleEmail}
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="spartan117@unsc.com"
              />
            </div>
          </div>

          <div className="right-form">
            <input
              className=" user input2"
              onChange={handlePassword}
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
            />
            <input
              className="user input2"
              onChange={handlePassword2}
              type="password"
              name="password"
              id="password2"
              value={password2}
              placeholder="Password"
            />
          </div>

          <div className="right-form">
            <input
              onChange={(event) => {
                console.log(event.target.files[0]);
                setAvatar_user(event.target.files[0]);
              }}
              type="file"
              placeholder="Add a Photo"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="form-validation"
            type="submit"
          >
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;

// -------------
// -------------
// -------------
// -------------
// -------------
