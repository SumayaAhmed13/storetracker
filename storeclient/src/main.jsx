import React from "react";
import ReactDOM from "react-dom/client";
import "./header/layout/style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./header/router/Routes";
import { Provider } from "react-redux";
import { store } from "./header/store/configureStore";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  </React.StrictMode>
);
