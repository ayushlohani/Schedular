import React from "react";
import Cards from "../../components/Cards/cards";
import { AdvisorList } from "../../data/AdvisorData";
import "./Home.scss";
import Calendar from "react-calendar";
import Category from "../Category/Category";
import LandingPage from "../LandingPage/LandingPage";
import { auth } from "../../components/Firebase/Firebase";

const Home = () => {
  let user = auth.currentUser;
  return (
    <>
    {user ? <Category /> : <LandingPage />}
    </>
  );
};

export default Home;
