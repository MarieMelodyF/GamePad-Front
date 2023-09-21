import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../images/smallLogo.png";
import toast, { Toaster } from "react-hot-toast";

const Signup = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [imgCloudinary, setImgCloudinary] = useState("");
  const [avatar_user, setAvatar_user] = useState({});

  // const [errorMessage, setErrorMessage] = useState();

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
      // console.log(avatar_user);
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("password2", password2);
      formData.append("avatar", avatar_user);

      if (password === password2 && username !== "" && email !== "") {
        toast.success("Your account is created ✨");
      }
      if (password !== password2) {
        toast.error("Please use same password");
      }
      if (username === "") {
        toast.error("Please enter a User name 💻 !");
      }
      if (email === "") {
        toast.error("Please enter mail adress 📧 !");
      }
      if (password2 === "") {
        toast.error("Please confirme your password");
      } else if (password === password2 && username && email) {
        // console.log("data", data);
        const response = await axios.post(
          "http://localhost:3000/user/signup",
          formData
        );
        console.log("res.data =>", response.data);
        //   console.log("data2 =>", data);
        const token = response.data.token;
        // setAvatar_user(response.data.avatar_user.secure_url);
        // navigate(`/home`);
        setToken(token);
        navigate("/home");
      }
    } catch (error) {
      console.log("==>", error);
    }
  };
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
