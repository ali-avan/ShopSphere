const mongoose = require("mongoose");
const Product = require("./models/Product");  // Path to the Product model

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/your-database-name", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB...");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });

// Hardcoded product data without images
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 2,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 3,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  },
  {
    id: 4,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 5,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 6,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  },
  {
    id: 7,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 8,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 9,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  },
  {
    id: 10,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 11,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 12,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  },
  {
    id: 13,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 14,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 15,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  },
  {
    id: 16,
    name: "Wireless Headphones",
    price: 199,
    description: "Noise-canceling over-ear headphones."
  },
  {
    id: 17,
    name: "Smartphone",
    price: 499,
    description: "Latest Android phone with awesome features."
  },
  {
    id: 18,
    name: "Laptop",
    price: 999,
    description: "High performance laptop for work and gaming."
  }
];

// Insert the hardcoded data into MongoDB
const insertProducts = async () => {
  try {
    await Product.deleteMany(); // Optional: Clear the collection before inserting new data
    await Product.insertMany(products); // Insert the hardcoded products
    console.log("Products inserted successfully");
    mongoose.disconnect(); // Close the connection after insertion
  } catch (error) {
    console.error("Error inserting products:", error);
  }
};

insertProducts();
