import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import AllGames from "./pages/AllGames";
import Games from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";

function App() {
  const [token, setToken] = useState(Cookies.get("token"));

  const API_KEY = "899db466e6d64907bb6dbc7dd3670574";

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      console.log("token exist");
    } else {
      Cookies.remove("token");
      console.log("token no exist");
    }
  }, [token]);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<AllGames />} />
          <Route path="/games/:id" element={<Games API_KEY={API_KEY} />} />
          <Route
            path="/user/login"
            element={
              <Login API_KEY={API_KEY} token={token} setToken={setToken} />
            }
          />
          <Route path="/user/signup" element={<Signup API_KEY={API_KEY} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
