import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Add Link import here
import "./ProductReview.css"; // Make sure the file exists

const ProductReview = () => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Handle review submission logic here
    console.log("Review submitted:", review, "Rating:", rating);

    // Redirect to a thank-you page or another page after submission
    navigate("/thank-you"); // Or any other page you want to navigate to
  };

  return (
    <div className="review-container">
      <h1>Review Your Order</h1>

      <form onSubmit={handleReviewSubmit}>
        <div className="rating">
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="0">Select rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div className="review-text">
          <label>Write your review:</label>
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows="5"
            placeholder="Share your experience..."
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-review-btn">
          Submit Review
        </button>
      </form>

      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default ProductReview;
