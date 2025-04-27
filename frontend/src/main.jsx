import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CartProvider } from "./services/CartContext";

import "./index.css"; // Make sure this file exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <CartProvider />
  </React.StrictMode>
);
