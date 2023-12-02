import React from "react";
import ReactDOM from "react-dom/client";
import Web5ContextProvider from "./contexts/web5.tsx";
import { RouterProvider } from "react-router-dom";
import router from "./router.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web5ContextProvider>
      <RouterProvider router={router} />
    </Web5ContextProvider>
  </React.StrictMode>
);
