import axios from "axios";
import React, { useState } from "react";

const Reviews = ({ game_id, game_name }) => {
  console.log(game_id);
  const [formData, setFormData] = useState({
    title: "",
    reviews: "",
    game_id: game_id,
    game_name: game_name,
  });
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
      if (formData.reviews.length < 10) {
        setErrorMessage("You need at least 10 characters to publish a review.");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/publish/reviews",
        {
          title: formData.title,
          reviews: formData.reviews,
          game_id: game_id,
          game_name: game_name,
        }
      );
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error.message);
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
