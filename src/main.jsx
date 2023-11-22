import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import { ArticleProvider } from "./context/ArticleContext.jsx";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID,
  currency: "USD",
  intent: "capture",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PayPalScriptProvider options={initialOptions}>
      <ArticleProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ArticleProvider>
    </PayPalScriptProvider>
  </React.StrictMode>
);
