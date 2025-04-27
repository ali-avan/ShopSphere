import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("home");
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // New states for adding products (updated)
  const [newProductName, setNewProductName] = useState("");
  const [newProductPrice, setNewProductPrice] = useState("");
  const [newProductImage, setNewProductImage] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");

  // States for editing user
  const [editUserId, setEditUserId] = useState(null);
  const [editUsername, setEditUsername] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (activePage === "users") {
      fetchUsers();
    } else if (activePage === "products") {
      fetchProducts();
    } else if (activePage === "orders") {
      fetchOrders();
    }
  }, [activePage]);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  // Handle adding a new product (updated)
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/products", {
        name: newProductName,
        price: newProductPrice,
        imageUrl: newProductImage,
        description: newProductDescription,
      });
      // After adding, refetch the products
      fetchProducts();
      // Clear form
      setNewProductName("");
      setNewProductPrice("");
      setNewProductImage("");
      setNewProductDescription("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // Handle edit user form submission
  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/users/${editUserId}`, {
        username: editUsername,
        email: editEmail,
        role: editRole,
      });
      fetchUsers(); // Refetch users after edit
      setEditUserId(null); // Reset edit form
      setEditUsername("");
      setEditEmail("");
      setEditRole("");
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user.");
    }
  };

  // Handle delete user action
  const handleDeleteUser = async (userId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        fetchUsers(); // Refetch users after delete
        alert("User deleted successfully!");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user.");
      }
    }
  };

  const renderContent = () => {
    switch (activePage) {
      case "home":
        return (
          <div className="dashboard-summary">
            <h2>Dashboard Summary</h2>
            <div className="summary-cards">
              <div className="card">
                <h3>{users.length}</h3>
                <p>Total Users</p>
              </div>
              <div className="card">
                <h3>{products.length}</h3>
                <p>Total Products</p>
              </div>
              <div className="card">
                <h3>{orders.length}</h3>
                <p>Total Orders</p>
              </div>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="manage-users">
            <h2>Manage Users</h2>

            {/* Edit User Form */}
            {editUserId && (
              <div className="edit-user-form">
                <h3>Edit User</h3>
                <form onSubmit={handleEditUser}>
                  <input
                    type="text"
                    placeholder="Username"
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    required
                  />
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <button type="submit">Update User</button>
                </form>
              </div>
            )}

            {/* User List Table */}
            <table>
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => {
                          setEditUserId(user._id);
                          setEditUsername(user.username);
                          setEditEmail(user.email);
                          setEditRole(user.role);
                        }}
                      >
                        Edit
                      </button>
                      <button onClick={() => handleDeleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "products":
        return (
          <div className="manage-products">
            <h2>Manage Products</h2>

            {/* Add new product form */}
            <form className="add-product-form" onSubmit={handleAddProduct}>
              <input
                type="text"
                placeholder="Product Name"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={newProductImage}
                onChange={(e) => setNewProductImage(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={newProductDescription}
                onChange={(e) => setNewProductDescription(e.target.value)}
                required
              />
              <button type="submit">Add Product</button>
            </form>

            {/* Product List Table */}
            <table>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>
                      <img src={product.image} alt={product.name} width="50" />
                    </td>
                    <td>{product.description}</td>
                    <td>
                      <button>Edit</button> <button>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return <h2>Welcome to Admin Dashboard</h2>;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2>Admin</h2>
        <nav>
          <ul>
            <li onClick={() => handlePageChange("home")}>Dashboard</li>
            <li onClick={() => handlePageChange("users")}>Manage Users</li>
            <li onClick={() => handlePageChange("products")}>
              Manage Products
            </li>
            <li onClick={handleLogout}>Logout</li>
          </ul>
        </nav>
      </aside>

      <main className="content">
        <header className="header">
          <h1>Admin Dashboard</h1>
        </header>

        <section className="main-content">{renderContent()}</section>
      </main>
    </div>
  );
};

export default AdminDashboard;
