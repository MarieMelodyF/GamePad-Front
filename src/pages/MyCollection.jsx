import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";

const MyCollection = ({ token }) => {
  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [isMember, setIsMember] = useState(true);
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        const response = await axios.post(
          `http://localhost:3000/allfavorites`,
          {
            token,
          }
        );
        setData(response.data);
        console.log("response1", response);
        setisLoading(false);
      };
      fetchData();
    } else {
      setIsMember(false);
    }
  }, [token]);
  const updateData = async (id) => {
    const gameId = id;
    const response = await axios.post(`http://localhost:3000/deletefavorite`, {
      token,
      gameId,
    });
    setData(response.data);
    console.log("repsonse 2", response);
  };
  return isLoading ? (
    <Loader />
  ) : (
    <main className="container">
      {data.map(({ title, id, image }, index) => {
        console.log(title);
        return (
          <div className="fav-card">
            <h2>{title}</h2>
            <div>
              <img className="img-fav" src={image} alt="image of game " />
            </div>
          </div>
        );
      })}
    </main>
  );
};
export default MyCollection;
