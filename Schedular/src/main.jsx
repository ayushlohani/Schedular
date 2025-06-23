import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Calender from "./pages/Calender/Calender.jsx";
import Login from "./pages/Login/Login.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import Category from "./pages/Category/Category.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/calender/:id",
        element: <Calender />,
      },
      {
        path: "/category",
        element: <Category />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>
);
