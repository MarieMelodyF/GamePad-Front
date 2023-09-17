import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import img from "../images/notfound2.jpg";
import { Link } from "react-router-dom";
import Reviews from "./Reviews";
import notfound from "../images/Sorry.png";

const Games = ({ API_KEY }) => {
  const [data, setData] = useState("");
  const [gameLike, setGameLike] = useState("");
  const [game_id, setGame_id] = useState("");
  const [game_name, setGame_name] = useState("");
  const [screenShot, setScreenShot] = useState();
  const [trailer, setTrailer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showReviews, setShowReviews] = useState();
  const [showErrorMessage, setShowErrorMessage] = useState();
  const { id } = useParams();
  // console.log(game_id);
  // console.log(game_name);
  // console.log(showErrorMessage);

  useEffect(() => {
    const fetchData = async () => {
      let one = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
      let two = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`;
      let three = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;
      let four = `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`;

      const requestOne = axios.get(one);
      const requestTwo = axios.get(two);
      const requestThree = axios.get(three);
      const requestFour = axios.get(four);
      try {
        await axios
          .all([requestOne, requestTwo, requestThree, requestFour])
          .then(
            axios.spread((...responses) => {
              const responseOne = responses[0];
              const responseTwo = responses[1];
              const responseThree = responses[2];
              const responseFour = responses[3];
              // console.log("responseOne", responseOne);
              // console.log("responseTwo", responseTwo);
              // console.log(responseFour);
              const gameid = responseOne.data.id;
              const gamename = responseOne.data.name;
              const screenShot = responseThree.data;
              const mp4url = responseFour.data.results; //[0].data["480"];
              // stockage url trailer
              const trailer = mp4url;
              // console.log(trailer); //[0].data["480"]);

              setGame_id(gameid);
              setGame_name(gamename);
              setScreenShot(screenShot);
              setTrailer(trailer);
              setData(responseOne.data);
              // console.log("infosGame ==>", responseOne.data);
              setGameLike(responseTwo.data);
              // console.log("autreJeux ==>", responseTwo.data);
              setIsLoading(false);
            })
          );
        if (data === undefined) {
        }
      } catch (error) {
        console.log("err", error.message);
        // setShowErrorMessage(error.response);
        // console.log("log ShowError", showErrorMessage);
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
        // console.log("responseallreviews", showReviews.data[0].title);
      } catch (error) {}
    };
    allReviews();
    // console.log("useeffectgamereview");
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
          <div className="rightCol">
            <div className="rightCol2">
              <button>Add to collection</button>
              <Link to={`/games/reviews/${id}`}>
                <button>Add reviews</button>
              </Link>
            </div>
            <div className="rightCol1">
              {screenShot.results.map((screen, index) => {
                // console.log(screen.image);

                return (
                  <div key={index}>
                    <img className="screenshot" src={screen.image} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="infos-bottom">
          <div className="col-bottom-left">
            <div>
              <p>Plateform :</p>
              {data.platforms.map(({ platform: { name }, index }) => {
                //   console.log("name ->", name);
                return (
                  <div key={index}>
                    <span>{name}</span>
                  </div>
                );
              })}
            </div>

            <div>
              <p>Released date :</p>
              <span>{data.released}</span>
            </div>
            <div>
              <p>Publisher :</p>
              {data.publishers.map((publisher, index) => {
                //   console.log("publisher ->", publisher);
                return (
                  <div key={index}>
                    <span>{publisher.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-bottom-middle">
            <div>
              <p>Genres :</p>
              {data.genres.map((list, index) => {
                //   console.log(list);
                return (
                  <div key={index}>
                    <span>{list.name}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <p>Developper :</p>
              {data.developers.map((developers, index) => {
                //   console.log("developers ->", developers);
                return (
                  <div key={index}>
                    <span>{developers.name}</span>
                  </div>
                );
              })}
            </div>
            <div>
              <p>Age :</p>
            </div>
          </div>
          <div className="col-bottom-right">
            {trailer.length <= 0 ? (
              <div>
                <img
                  className="notfound"
                  src={notfound}
                  alt="trailer not found"
                />
              </div>
            ) : (
              <video
                className="trailer"
                controls
                muted
                autoPlay={true}
                preload="auto"
              >
                <source
                  src={trailer[0].data["480"]}
                  type="video/mp4"
                  autoPlay={true}
                />
              </video>
            )}
          </div>
        </section>
        <h2 className="h2-game">About</h2>
        <div className="about">
          <span>{data.description_raw}</span>
        </div>

        <div className="other_Games">
          <h2 className="h2-game">Game of the same serie</h2>
          <div className="carrousel">
            {gameLike.results.map((results, index) => {
              // console.log("OtherGames ->", results);
              // const id = results.id;
              return (
                <div key={index}>
                  <div className="test" key={index}>
                    <Link to={`/games/${results.id}`}>
                      <img
                        className="inOtherGame"
                        src={results.background_image}
                        alt="image jeux gta"
                      />
                    </Link>

                    <p className="title">{results.name}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <h1 className="start-reviews">Reviews</h1>
        {showReviews.data.map(
          ({ title, reviews, author: { username, avatar_user }, index }) => {
            return (
              <div className="allreviews">
                <div className="titlereviews">
                  <p>{title}</p>
                </div>

                <div className="reviews">
                  <p>{reviews}</p>
                </div>

                <div className="user">
                  <img
                    className="img-user"
                    src={avatar_user.secure_url}
                    alt="avatar"
                  />
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
