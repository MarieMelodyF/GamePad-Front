import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import AllGames from "./pages/AllGames";
import Games from "./pages/Game";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cookies from "js-cookie";
import Reviews from "./pages/Reviews";

function App() {
  const [data, setData] = useState("");
  const [token, setToken] = useState(Cookies.get("token"));
  const [game_id, setGame_id] = useState();
  const [game_name, setGame_name] = useState();
  console.log("gameid", game_id);
  console.log("gamename", game_name);

  const API_KEY = "899db466e6d64907bb6dbc7dd3670574";

  useEffect(() => {
    if (token) {
      Cookies.set("token", token, { expires: 7 });
      // console.log("token exist");
    } else {
      Cookies.remove("token");
      // console.log("token no exist");
    }
  }, [token]);

  return (
    <>
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<AllGames />} />
          <Route
            path="/games/:id"
            element={
              <Games
                API_KEY={API_KEY}
                game_id={game_id}
                game_name={game_name}
              />
            }
          />
          <Route
            path="/user/login"
            element={
              <Login API_KEY={API_KEY} token={token} setToken={setToken} />
            }
          />
          <Route path="/user/signup" element={<Signup API_KEY={API_KEY} />} />
          <Route
            path="/publish/reviews"
            element={
              <Reviews
                API_KEY={API_KEY}
                token={token}
                setToken={setToken}
                game_id={game_id}
                game_name={game_name}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
