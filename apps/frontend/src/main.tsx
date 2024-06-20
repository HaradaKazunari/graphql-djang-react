import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./providers/app";
import { Routes } from "@generouted/react-router/lazy";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppProvider>
      <Routes />
    </AppProvider>
  </React.StrictMode>
);
