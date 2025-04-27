# ShopSphere
ShopSphere is an e-commerce store solely developed in MERN stack. Based on two separate dashboards for buyer and seller. Cart is integrated and prices dynamically change based on deletion from cart list. Admin can edit and delete customers., Add items  and view the overall stats of store. MongoDB is storing all the results in specific tables.


This project is a full-stack web application where admins can manage users — view, update, and delete them.
It uses React for frontend, Express.js for backend, MongoDB for database, and Axios for API communication.

Technologies Used
Frontend: React.js
Backend: Node.js + Express.js
Database: MongoDB + Mongoose
Tooling: Vite, Nodemon

 Project Setup Instructions
 
1. Clone the Repository

git clone https://github.com/your-username/shopsphere.git
cd shopsphere

2. Install Dependencies

cd backend
npm install

cd frontend
npm install

3. Configure Environment Variables
# backend/.env
PORT=5000
MONGO_URI=your_mongodb_connection_string

4. Run the App

cd backend
npm run dev

cd frontend
npm run dev
