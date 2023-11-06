import React from "react";
import ReactDOM from "react-dom/client";
import "./index.module.scss";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "providers/ThemeProvider";
import { Provider } from "react-redux";
import "./firebase";
import "firebase/firestore";
import "firebase/auth";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            border: "5px solid #713200",
            fontSize: "25px",
          },
        }}
      />
    </ThemeProvider>
  </BrowserRouter>,
);
