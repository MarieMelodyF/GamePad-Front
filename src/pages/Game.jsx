import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import img from "../images/notfound2.jpg";
import { Link, useNavigate } from "react-router-dom";
import Reviews from "./Reviews";
import notfound from "../images/Sorry.png";
import Loader from "../components/Loader";

const Games = ({ token }) => {
  const navigate = useNavigate();

  const [data, setData] = useState("");
  const [gameLike, setGameLike] = useState("");
  const [game_id, setGame_id] = useState("");
  const [game_name, setGame_name] = useState("");
  const [screenShot, setScreenShot] = useState();
  const [trailer, setTrailer] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showReviews, setShowReviews] = useState();
  const [inFavorites, setInFavorites] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const favoritesList = async () => {
      try {
        if (token) {
          const response = await axios.post(
            `http://localhost:3000/allfavorites`,
            {
              token: token,
            }
          );
          console.log("res", response);
          // response.data.some((element) => element.id === data.id) &&
          setInFavorites(true);
        } else {
          return null;
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    // AFFICHER LES INFOS DU JEUX
    const fetchData = async () => {
      // let one = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;
      // let two = `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`;
      // let three = `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`;
      // let four = `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`;

      let one = `http://localhost:3000/games/${id}`;
      let two = `http://localhost:3000/game/${id}/similar`;
      let three = `http://localhost:3000/game/${id}/screenshots`;
      let four = `http://localhost:3000/game/${id}/trailer`;
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
      }
    };

    fetchData();
    favoritesList();
  }, [id]);

  // ADD FAV
  const addGame = () => {
    if (token) {
      console.log(token);
      const favGame = async () => {
        try {
          const favorite = {
            title: data.name,
            id: data.id,
            image: data.background_image,
          };
          console.log("favorite", favorite);
          const response = await axios.post(`http://localhost:3000/favorite`, {
            token: token,
            favorite: favorite,
          });
          console.log("responseAddGame", response);
        } catch (error) {
          console.log("error add game", error.response);
        }
      };
      favGame();
    } else {
      navigate("/signin");
    }
  };

  // const deleteFav = async (id) => {
  //   const gameId = id;
  //   await axios.put(`http://localhost:3000/deletefavorite`, {
  //     token,
  //     gameId,
  //   });
  //   setInFavorites(false);
  // };

  // AFFICHER LES REVIEWS
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
        // console.log("responseallreviews", showReviews.data[0].date);
        // console.log("->", showReviews);
      } catch (error) {
        console.log("err", error.response);
      }
    };
    allReviews();
    // console.log("useeffectgamereview");
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return isLoading ? (
    <Loader />
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
              <button onClick={addGame}>Add to collection</button>
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
                    <Link
                      to={`/games/${results.id}`}
                      key={results.id}
                      onClick={scrollToTop}
                    >
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
          ({
            title,
            reviews,
            date,
            author: { username, avatar_user },
            index,
          }) => {
            // console.log(title);
            return (
              <div className="allreviews">
                <div className="titlereviews">
                  <p>{title}</p>
                </div>
                <div className="reviews">
                  <p>{reviews}</p>
                </div>
                <div className="user">
                  <div className="user">
                    <img
                      className="img-user"
                      src={avatar_user.secure_url}
                      alt="avatar"
                    />
                    <p>{username}</p>
                  </div>
                  <span>{date.slice(4, 15)}</span>
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
