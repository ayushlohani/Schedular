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
import SessionType from "./pages/SessionType/SessionType.jsx";
import Signin from "./pages/SignIn/Signin.jsx";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute.jsx";
import EventCard from "./components/Cards/EventCard.jsx";
import DashBoard from "./pages/DashBoard/DashBoard.jsx";
import AdvisorList from "./pages/AdvisorList/AdvisorList.jsx";
import Schedule from "./pages/Schedule/Schedule.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import RegisterForm from "./pages/SigninForm/SigninForm.jsx";
import RegisterAdvisor from "./pages/SigninForm/AdvisorSignIn.jsx";
import LoginAdvisor from "./pages/Login/LoginAdvisor.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/advisor/login",
        element: <LoginAdvisor />,
      },
      {
        path: "/Signin",
        element: <Signin />,
      },
      {
        path: "/calender/:id",
        element: <Calender />,
      },
      {
        path: "/category",
        element: <Category />,
      },
      {
        path: "/category/:category",
        element: <SessionType />,
      },
      {
        path: "/category/:category/:session",
        element: <AdvisorList />,
      },
      {
        path: "/category/:category/:session/:advisorId/:userId",
        element: <Schedule />,
      },
      {
        path: "/Dashboard",
        element: <DashBoard />,
      },
      {
        path: "/user/signin",
        element: <RegisterForm />,
      },
      {
        path: "/advisor/signin",
        element: <RegisterAdvisor />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
