// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Global styles (if you have them)
import App from './App';  // Main app component

// Render the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
