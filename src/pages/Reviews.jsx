import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

const Reviews = ({ token }) => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // if (formData.reviews.length < 10) {
      //   setErrorMessage("You need at least 10 characters to publish a review.");
      //   return;
      // }
      const response = await axios.post(
        `http://localhost:3000/games/reviews`,
        {
          title: formData.title,
          reviews: formData.reviews,
          game_id: id,
        },

        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.response);
      setErrorMessage("An error occurred while submitting the review.");
    }
  };

  return (
    <div className="container form">
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
