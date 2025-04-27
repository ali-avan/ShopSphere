import React, { useState, useEffect } from "react";
import { useCart } from "../services/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // Importing the CSS for styling

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();
  const [localCartItems, setLocalCartItems] = useState(cartItems);
  const navigate = useNavigate();

  const totalPrice = localCartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setLocalCartItems(storedCart);
  }, []);

  // Save cart to localStorage whenever the cartItems state changes
  useEffect(() => {
    if (localCartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(localCartItems));
    }
  }, [localCartItems]);

  // Function to handle checkout and send order data to backend
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: localCartItems,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Display success message and redirect to the Thank You page
        alert("Order placed successfully!");
        navigate("/thank-you"); // Redirect to Thank You page
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error(error);
      alert("Error while placing order");
    }
  };

  // Function to remove item from cart
  const removeItemFromCart = (itemId) => {
    const updatedCart = localCartItems.filter((item) => item.id !== itemId);
    setLocalCartItems(updatedCart); // Update the local state
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {localCartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {localCartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.price * item.quantity}</p>
                <button
                  className="remove-btn"
                  onClick={() => removeItemFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
