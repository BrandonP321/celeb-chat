import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "destyle.css";
import "./styles/globals.scss";
import "./index.scss";
import { Provider } from "react-redux";
import { store } from "@/Store";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </Provider>
  // </React.StrictMode>
);
