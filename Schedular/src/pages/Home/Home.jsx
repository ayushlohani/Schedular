import React from "react";
import Cards from "../../components/Cards/cards";
import doctorList from "../../data/DoctorData";
import "./Home.scss"
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
      <div className="home-scroll-container">
      {doctorList.map((doctor, index) => (
        <Cards key={index} doctor={doctor} />
      ))}
    </div>
    
  );
};

export default Home;
