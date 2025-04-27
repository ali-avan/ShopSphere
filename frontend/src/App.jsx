import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./components/Login";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import Cart from "./components/Cart";
import { CartProvider } from "./services/CartContext"; // ✅ make sure this path is correct
import Checkout from "./components/Checkout";
import AdminProductList from "./components/AdminDashboard";
import OrderTracking from "./components/OrderTracking";
import ProductReview from "./components/ProductReview";

function App() {
  return (
    <Router>
      <CartProvider>
        {" "}
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/products" element={<ProductList />} />

            <Route path="/cart" element={<Cart />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/thank-you" element={<Checkout />} />
            <Route path="/admin-dashboard" element={<AdminProductList />} />
            <Route path="/order-tracking" element={<OrderTracking />} />
            <Route path="/product-review" element={<ProductReview />} />
          </Routes>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;
