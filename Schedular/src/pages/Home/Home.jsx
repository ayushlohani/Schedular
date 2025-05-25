import React from "react";
import Cards from "../../components/Cards/cards";
import doctorList from "../../data/DoctorData";
import "./Home.scss"
import Calendar from "react-calendar"

const Home = () => {
  return (
      <div className="home-scroll-container">
      <div className="left">
      {doctorList.map((doctor, index) => (
        <Cards key={index} doctor={doctor} />
      ))}
      </div>
      <div className="right">
        <img src="https://static.vecteezy.com/system/resources/previews/013/141/034/non_2x/book-doctor-appointment-card-template-schedule-hospital-visit-editable-social-media-post-design-flat-color-illustration-for-poster-web-banner-ecard-vector.jpg" />
      </div>
    </div>
    
  );
};

export default Home;
