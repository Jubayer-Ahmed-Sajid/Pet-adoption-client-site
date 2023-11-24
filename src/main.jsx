
import React from "react";
import {
  RouterProvider,
} from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import Router from "./Routes/Router";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>
);