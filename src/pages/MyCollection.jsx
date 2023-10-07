import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import nofav from "../images/nofav.png";

const MyCollection = ({ token }) => {
  const deletedToast = () => toast(`GAME DELETED !`);

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMember, setIsMember] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        try {
          const response = await axios.post(
            `https://site--gamepad-back--r2txk865xjj8.code.run/allfavorites`,
            {
              token,
            }
          );
          setData(response.data);
          setIsLoading(false);
          console.log("response1", response);
        } catch (error) {
          console.error("Error fetching data:", error);
          setIsLoading(false);
        }
      };
      fetchData();
    } else {
      setIsMember(false);
    }
  }, [token]);

  const deleteOneFav = async (id) => {
    try {
      const response = await axios.post(
        `https://site--gamepad-back--r2txk865xjj8.code.run/deletefavorite`,
        {
          token,
          gameId: id,
        }
      );
      setData(data.filter((item) => item.id !== id));
      deletedToast();
      console.log("response2", response);
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isLoading ? (
    <Loader />
  ) : data.length === 0 ? (
    <div className="fav container">
      <div className="no-fav">
        <p style={{ fontSize: "25px" }}>No favorites yet</p>
        <p>
          Click on "Add to collection" on the game page to add a game to your
          favorites
        </p>
      </div>
    </div>
  ) : (
    <main className="fav container">
      {data.map(({ title, id, image }) => (
        <div className="fav-game" key={id}>
          <h2>{title}</h2>
          <div>
            <div>
              <div className="delete">
                <button
                  className="delete-button"
                  onClick={() => {
                    deleteOneFav(id);
                  }}
                >
                  <Toaster />X
                </button>

                <Link to={`/games/${id}`} key={id} onClick={scrollToTop}>
                  <img className="img-fav" src={image} alt="image of game" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
};

export default MyCollection;
