import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "destyle.css";
import "./styles/globals.scss";
import './index.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
  // <React.StrictMode>
  // </React.StrictMode>
);
