import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';//include the router
import { FavoritesProvider } from './context/FavoritesContext';

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter basename={import.meta.env.BASE_URL}>
<FavoritesProvider>

  <React.StrictMode>
    <App />
  </React.StrictMode>
  </FavoritesProvider>

    </BrowserRouter>

);
