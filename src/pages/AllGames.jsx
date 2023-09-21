import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import img from "../images/notfound2.jpg";
import Loader from "../components/Loader";
// import Cookies from "js-cookie";

const AllGames = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentPage = Number(queryParams.get("page"));

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("");
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(currentPage || 1);
  const [limit, setLimit] = useState(40);
  // console.log("search", search);

  if (currentPage && currentPage !== page) {
    setPage(currentPage);
  }

  useEffect(() => {
    const API_KEY = "899db466e6d64907bb6dbc7dd3670574";
    const page_size = 100;

    let count = "";
    // console.log(count);

    const fetchData = async () => {
      try {
        const name = search || "";
        // console.log("name search =>", name);
        const response = await axios.get(
          `http://localhost:3000/home?&search=${name}&page_size=${page_size}&page=${page}&ordering=${ordering}`
        );
        count = response.data.count;

        console.log("response.data", response.data);
        setData(response.data);
        setIsLoading(false);
        setCount(count);
      } catch (error) {
        console.log("error", error.message);
      }
    };

    fetchData();
  }, [page, limit, search, ordering]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return isLoading ? (
    <Loader />
  ) : (
    <>
      {/* button next/previous & search bar */}
      <div className="container search">
        <div className="button-container">
          {page > 1 && (
            <button
              className="pageButton2"
              onClick={() => {
                setPage(page - 1);
                navigate(`/home?page=${page - 1}`);
                // console.log(page);
              }}
            >
              Previous
            </button>
          )}
        </div>

        <div className="search_barre">
          <input
            className="search_barre"
            type="search"
            placeholder="Search a game..."
            onChange={(event) => {
              setSearch(event.target.value);
              // console.log(event.target.value);
            }}
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="button-container">
          {page < Math.ceil(count / limit) && (
            <button
              className="pageButton"
              onClick={() => {
                setPage(page + 1);
                navigate(`/home?page=${page + 1}`);
                // console.log(page);
              }}
            >
              Next
            </button>
          )}
        </div>
      </div>
      <span className="page">
        {page} sur {Math.ceil(count / limit)}
      </span>
      <div className="filters">
        <div>
          <h4>Filter by: </h4>
        </div>
        <div className="all-filters">
          <p
            onClick={() => {
              navigate("/home");
            }}
          >
            none filter
          </p>
          <p
            onClick={() => {
              setOrdering("name");
            }}
          >
            Name
          </p>
          <p
            onClick={() => {
              setOrdering("released");
            }}
          >
            Released
          </p>
          <p
            onClick={() => {
              setOrdering("added");
            }}
          >
            Added
          </p>
          <p
            onClick={() => {
              setOrdering("created");
            }}
          >
            Created
          </p>
          <p
            onClick={() => {
              setOrdering("rating");
            }}
          >
            Rating
          </p>
        </div>
      </div>

      <main className="container home">
        {/* map sur results pour trouver les infos à recupérer */}
        {data.results.map(
          ({ background_image, name, id, metacritic, rating }) => {
            // console.log(background_image);

            return (
              <div key={id}>
                <div>
                  <Link to={`/games/${id}`} onClick={scrollToTop}>
                    {background_image === null ? (
                      <img className="imgGames" src={img} alt="notfound" />
                    ) : (
                      <img
                        className="imgGames"
                        src={background_image}
                        alt="image du jeu"
                      />
                    )}
                  </Link>
                  <div className="card">
                    <h3>{name}</h3>
                    <div className="card-game">
                      <div className="rate">
                        <p>rate</p>
                        <p className="rating">{rating}</p>
                      </div>
                      <div className="meta">
                        <p>meta</p>
                        <p className="metacritic">{metacritic}</p>
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            );
          }
        )}
      </main>
    </>
  );
};

export default AllGames;
