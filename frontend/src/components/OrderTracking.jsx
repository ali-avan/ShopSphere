// src/components/OrderTracking.js

import React, { useState } from "react";
import axios from "axios";

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(null);
  const [error, setError] = useState("");

  // Handle form submission
  const handleTrackOrder = async (e) => {
    e.preventDefault();
    console.log("Form submitted with order ID:", orderId); // Debug log

    try {
      // Make API call to backend to fetch order status
      const response = await axios.get(
        `http://localhost:5000/api/orders/${orderId}`
      );
      console.log("API Response:", response); // Log the API response

      if (response.status === 200) {
        setOrderStatus(response.data);
        setError("");
      } else {
        setError("Failed to fetch order status");
        setOrderStatus(null);
      }
    } catch (err) {
      console.error("Error tracking order:", err.response || err); // More detailed error log
      setError("Order not found or invalid order ID");
      setOrderStatus(null);
    }
  };

  return (
    <div className="order-tracking">
      <h2>Track Your Order</h2>
      <form onSubmit={handleTrackOrder}>
        <input
          type="text"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="Enter Order ID"
          required
        />
        <button type="submit">Track Order</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {orderStatus && (
        <div>
          <h3>Order Status:</h3>
          <p>
            <strong>Customer Name:</strong> {orderStatus.customerName}
          </p>
          <p>
            <strong>Status:</strong> {orderStatus.status}
          </p>
          <p>
            <strong>Customer Email:</strong> {orderStatus.customerEmail}
          </p>
          <p>
            <strong>Customer Phone:</strong> {orderStatus.customerPhone}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderTracking;
