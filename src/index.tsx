import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import Home from "./pages/Home";
import Game from "./pages/Game";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rules from "./pages/Rules";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Statistics from "./pages/Statistics";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
  },
  {
    path: "/game",
    element: <Game></Game>,
  },
  {
    path: "/rules",
    element: <Rules></Rules>,
  },
  {
    path: "/statistics",
    element: <Statistics></Statistics>,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
