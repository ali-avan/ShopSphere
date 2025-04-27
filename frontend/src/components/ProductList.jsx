import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../services/CartContext";
import "./ProductList.css";

const ProductList = () => {
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const initialQuantities = {};
    products.forEach((product) => {
      initialQuantities[product.id] = 1;
    });
    setQuantities(initialQuantities);
  }, [products]); // 🛠 IMPORTANT

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, parseInt(value) || 1),
    }));
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    const quantity = quantities[product.id] || 1;
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    alert(`${product.name} added to cart (${quantity})`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-container">
      <div className="header">
        <input
          type="text"
          placeholder="Search products..."
          className="search-bar"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="cart-button" onClick={handleCartClick}>
          Cart
        </button>
      </div>

      <h2 className="heading">Our Products</h2>
      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => handleProductClick(product.id)}
            >
              <div className="image-container">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="product-image"
                />
              </div>

              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price}</p>

              <div className="card-bottom">
                <div className="quantity-control">
                  <label>Qty:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantities[product.id] || 1}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>

                <button
                  className="add-btn"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductList;
