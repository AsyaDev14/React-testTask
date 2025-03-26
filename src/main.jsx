import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.scss";
import App from "./App.jsx";
import { HashRouter } from "react-router";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </HashRouter>
);
