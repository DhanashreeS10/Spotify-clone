import React from 'react';
import ReactDOM from 'react-dom/client';

import "./styles/app.css";
import "./styles/sidebar.css";
import "./styles/navbar.css";
import "./styles/search.css";
import "./styles/cards.css";
import "./styles/library.css";
import "./styles/player.css";
// import "./styles/responsive.css";

import App from './App';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);