import axios from "axios";
import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Reviews = ({ token }) => {
  const navigate = useNavigate();
  // console.log(token);

  const { id } = useParams();
  // console.log(id);
  const [formData, setFormData] = useState({
    title: "",
    reviews: "",
    game_id: id,
  });
  // console.log(formData);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  let time = new Date().getTime();
  let date = new Date(time);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (formData.reviews.length < 10) {
        toast.error("You need at least 10 characters to publish a review.");
        return;
      } else if (formData.title.length < 5) {
        toast.error("You need at least 5 characters on title to publish");
      } else {
        const response = await axios.post(
          `http://localhost:3000/games/reviews`,
          {
            title: formData.title,
            reviews: formData.reviews,
            game_id: id,
            date: date.toString(),
          },

          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response:", response.data);
        navigate(`/games/${id}`);
      }
    } catch (error) {
      // console.error("Error:", error.response);
      if (error.message === "Request failed with status code 400") {
        console.log("error.message", error.response);
        toast.error("You have already publish a reviews for this game 😉.");
      } else toast.error(`You need to be logged. Go to Login`);
      console.log(error);
    }
  };

  return (
    <div className="container form">
      <Toaster />
      <form className="reviewsForm" onSubmit={handleSubmit}>
        <label htmlFor="title">Reviews title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="reviews">Reviews text</label>
        <textarea
          id="reviews"
          name="reviews"
          cols="30"
          rows="10"
          value={formData.reviews}
          onChange={handleChange}
        ></textarea>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="reviews-submit">
          <button
            className="reviewsButton"
            type="submit"
            id="submit"
            name="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reviews;
