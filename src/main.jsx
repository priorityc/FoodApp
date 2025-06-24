import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';//include the router
import { FavoritesProvider } from './context/FavoritesContext';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
<FavoritesProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </FavoritesProvider>

    </BrowserRouter>

);
