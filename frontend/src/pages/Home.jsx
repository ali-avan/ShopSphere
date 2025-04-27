import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>
          Welcome to <span>ShopSphere</span>!
        </h2>
        <p>
          Your one-stop platform for buying and selling amazing tech products
        </p>
        <div className="home-buttons">
          <Link to="/register" className="btn home-btn">
            Get Started
          </Link>
          <Link to="/login" className="btn home-btn">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
