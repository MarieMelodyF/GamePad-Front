import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import img from "../images/notfound2.jpg";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";

const Games = ({ API_KEY }) => {
  const [data, setData] = useState("");
  const [gameLike, setGameLike] = useState("");
  const [game_id, setGame_id] = useState("");
  const [game_name, setGame_name] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState();
  const [showReviews, setShowReviews] = useState();
  const { id } = useParams();
  // console.log(game_id);
  // console.log(game_name);

  useEffect(() => {
    const fetchData = async () => {
      let one = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
      let two = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`;

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);

      try {
        await axios.all([requestOne, requestTwo]).then(
          axios.spread((...responses) => {
            const responseOne = responses[0];
            const responseTwo = responses[1];
            // console.log("responseOne", responseOne);
            // console.log("responseTwo", responseTwo);
            const gameid = responseOne.data.id;
            const gamename = responseOne.data.name;

            setGame_id(gameid);
            setGame_name(gamename);
            // console.log(gameid);
            setData(responseOne.data);
            // console.log("infosGame ==>", responseOne.data);
            setGameLike(responseTwo.data);
            // console.log("autreJeux ==>", responseTwo.data);

            setIsLoading(false);
          })
        );
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const allReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/allreviews/${id}`
        );
        response.data.map((reviews) => ({
          ...reviews,
        }));
        setShowReviews(response);
        console.log("responseallreviews", showReviews[0].title);
      } catch (error) {}
    };
    allReviews();
    console.log("useeffectgamereview");
  }, []);

  return isLoading ? (
    <p> En chargement...</p>
  ) : (
    <>
      <main className="container">
        <section className="infos">
          <div className="leftCol">
            <div>
              <h1>{data.name}</h1>
            </div>

            {data.background_image === null ? (
              <img className="imgGame" src={img} alt="notfound" />
            ) : (
              <img
                className="imgGame"
                src={data.background_image}
                alt="image du jeu"
              />
            )}
          </div>

          <div className="middleCol">
            <div>
              <button>Add to collection</button>
              <Link to={`/games/reviews/${id}`}>
                <button>Add reviews</button>
              </Link>
            </div>
            <p>plateform</p>
            {data.platforms.map(({ platform: { name }, index }) => {
              //   console.log("name ->", name);
              return (
                <div key={index}>
                  <span>{name}</span>
                </div>
              );
            })}

            <div>
              <p>Released date</p>
              <p>{data.released}</p>
            </div>
            <p>Publisher</p>
            {data.publishers.map((publisher, index) => {
              //   console.log("publisher ->", publisher);
              return (
                <div key={index}>
                  <span>{publisher.name}</span>
                </div>
              );
            })}
          </div>

          <div className="rightCol">
            <p>Genres</p>
            {data.genres.map((list, index) => {
              //   console.log(list);
              return (
                <div key={index}>
                  <span>{list.name}</span>
                </div>
              );
            })}
            <p>Developper</p>
            {data.developers.map((developers, index) => {
              //   console.log("developers ->", developers);
              return (
                <div key={index}>
                  <span>{developers.name}</span>
                </div>
              );
            })}
            <p>Age</p>
          </div>
        </section>
        <div className="bottomCol">
          <h2>About</h2>
          <span>{data.description_raw}</span>
        </div>

        <div className="other_Games">
          {gameLike.results.map((results, index) => {
            // console.log("OtherGames ->", results.background_image);
            return (
              <div key={index}>
                <div className="test">
                  <img
                    className="inOtherGame"
                    src={results.background_image}
                    alt="image jeux gta"
                  />
                  <p className="title">{results.name}</p>
                </div>
              </div>
            );
          })}
        </div>

        <h1 className="start-reviews">Reviews</h1>
        {showReviews.data.map(
          ({ title, reviews, author: { username } }, index) => {
            return (
              <div className="allreviews">
                <div className="titlereviews">
                  <p>{title}</p>
                </div>

                <div className="reviews">
                  <p>{reviews}</p>
                </div>

                <div className="user">
                  <p>{username}</p>
                </div>
              </div>
            );
          }
        )}
      </main>
    </>
  );
};

export default Games;
