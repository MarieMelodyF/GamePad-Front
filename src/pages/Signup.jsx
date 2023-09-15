import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = ({ token, setToken }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [imgCloudinary, setImgCloudinary] = useState("");
  const [avatar_user, setAvatar_user] = useState("");

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
      setAvatar_user(response.data.avatar_user.secure_url);
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
    <div>
      <div className="form-container">
        <div className="form">
          <form className="signup-input">
            <h1>Register now</h1>
            <input
              onChange={handleUsername}
              type="text"
              name="username"
              id="MasterChief"
              value={username}
              placeholder="Master Chief "
            />
            <input
              onChange={handleEmail}
              type="email"
              name="email"
              id="email"
              value={email}
              placeholder="spartan117@unsc.com"
            />
            <input
              onChange={handlePassword}
              type="password"
              name="password"
              id="password"
              value={password}
              placeholder="Password"
            />
            <input
              onChange={handlePassword2}
              type="password"
              name="password"
              id="password2"
              value={password2}
              placeholder="Password"
            />
            <input
              onChange={(event) => {
                setAvatar_user(event.target.files[0]);
              }}
              type="file"
              placeholder="Add a Photo"
            />
          </form>
          <button
            onClick={handleSubmit}
            className="form-validation"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
