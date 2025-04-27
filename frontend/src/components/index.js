import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';  // Optional: Import your CSS styles
import App from './App';  // Import the main App component

// Render the App component inside the div with the id 'root'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')  // This is where your app will be displayed in the DOM
);
