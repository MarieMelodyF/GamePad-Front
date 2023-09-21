import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyCollection = ({ token }) => {
  const deletedToast = () => toast(`GAME DELETED !`);

  const [data, setData] = useState({});
  const [isLoading, setisLoading] = useState(true);
  const [isMember, setIsMember] = useState(true);
  const [updateData, setUpdateData] = useState("");

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
        // console.log("response1", response);
        setisLoading(false);
      };
      fetchData();
    } else {
      setIsMember(false);
    }
  }, [token]);

  const deleteOneFav = async (id) => {
    const gameId = id;
    console.log(gameId);
    const response = await axios.post(`http://localhost:3000/deletefavorite`, {
      token,
      gameId,
    });
    setData(response.data);
    console.log("repsonse 2", response);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main className="fav container">
      {data.map(({ title, id, image }, index) => {
        // console.log(title);
        return (
          <div className="fav-game" key={id}>
            <h2>{title}</h2>
            <div>
              <div className="fav">
                <div className="delete">
                  <button
                    className="delete-button"
                    onClick={() => {
                      deleteOneFav(id);
                      deletedToast();
                    }}
                  >
                    <Toaster />X
                  </button>

                  <Link to={`/games/${id}`} key={id} onClick={scrollToTop}>
                    <img className="img-fav" src={image} alt="image of game " />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
};
export default MyCollection;
