import React from "react";
import { Link } from "react-router-dom";
import "./Checkout.css"; // Add your styles here

const Checkout = () => {
  // Hardcoded order status example
  const orderStatus = [
    { step: 1, status: "Order Placed", time: "2025-04-27 14:00" },
    { step: 2, status: "Shipped", time: "2025-04-27 16:30" },
    { step: 3, status: "Out for Delivery", time: "2025-04-28 09:00" },
    { step: 4, status: "Delivered", time: "2025-04-28 12:00" },
  ];

  return (
    <div className="thank-you-container">
      <h1>Thank You for Your Order!</h1>
      <p>
        Your order has been successfully placed. We appreciate your business.
      </p>

      <div className="order-status">
        <h3>Order Status</h3>
        <ul>
          {orderStatus.map((status) => (
            <li key={status.step}>
              <strong>Step {status.step}: </strong>
              {status.status} <br />
              <small>Time: {status.time}</small>
            </li>
          ))}
        </ul>
      </div>

      {/* Review Order Button */}
      <Link to="/product-review" className="review-order-btn">
        Review Your Order
      </Link>

      {/* Back to Home Button */}
      <Link to="/" className="back-home-btn">
        Back to Home
      </Link>
    </div>
  );
};

export default Checkout;
