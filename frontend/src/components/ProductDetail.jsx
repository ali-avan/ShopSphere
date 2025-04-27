import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newRating, setNewRating] = useState(0);
  const [newReview, setNewReview] = useState("");
  const [message, setMessage] = useState(""); // For success or error messages

  useEffect(() => {
    console.log("Product ID:", productId);

    const productData = products.find((p) => p.id === parseInt(productId));
    if (productData) {
      setProduct(productData);
    } else {
      console.error("Product not found!");
    }

    const fetchReviews = async () => {
      try {
        const res = await axios.get(`/api/reviews/${productId}`);
        setReviews(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Failed to fetch reviews", err);
        setReviews([]);
      }
    };

    fetchReviews();
  }, [productId]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (newRating > 0 && newReview.trim()) {
      try {
        const reviewData = {
          rating: newRating,
          review: newReview,
        };

        const res = await axios.post("http://localhost:5174/api/reviews", {
          productId,
          ...reviewData,
        });

        // Set success message
        setMessage(res.data.message || "Review submitted successfully!");

        // Optimistic update
        setReviews((prev) => [...prev, reviewData]);

        // Reset form fields
        setNewReview("");
        setNewRating(0);

        // Clear the success message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      } catch (err) {
        console.error("Failed to submit review", err);
        setMessage("Failed to submit review. Please try again.");
        setTimeout(() => setMessage(""), 3000);
      }
    } else {
      alert("Please provide a rating and a review.");
    }
  };

  return (
    <div className="product-detail">
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          <p>{product.description}</p>
          <p className="product-price">${product.price}</p>

          <div className="product-reviews">
            <h3>Reviews</h3>
            {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </div>
                  <p>{review.review}</p>
                </div>
              ))
            )}
          </div>

          <div className="add-review">
            <h3>Leave a Review</h3>

            {/* Success/Error message */}
            {message && <p className="message">{message}</p>}

            <form onSubmit={handleReviewSubmit}>
              <div>
                <label>Rating:</label>
                <select
                  value={newRating}
                  onChange={(e) => setNewRating(Number(e.target.value))}
                >
                  <option value={0}>Select rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
              </div>
              <div>
                <label>Review:</label>
                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  required
                  className="review-textarea"
                />
              </div>
              <button type="submit">Submit Review</button>
            </form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;
