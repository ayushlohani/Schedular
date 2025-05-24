import React from "react";
import "./Cards.scss";
import { useNavigate } from "react-router-dom";

const Cards = ({ doctor }) => {
  const navigate = useNavigate();
  const goToCalender = () => {
    navigate(`/Calender/${doctor.id}`);
  };
  return (
    <div className="cards">
      <div className="card-container">
        <div className="left-section">
          <div className="avatar">
            <img src={doctor.image} alt={doctor.name} />
          </div>
        </div>
        <div className="right-section">
          <h2>{doctor.name}</h2>
          <p className="speciality">
            {doctor.specialization} | <span>{doctor.experience}</span>
          </p>
          <hr className="divider" />
          <div className="details">
            <p>{doctor.clinic}</p>
            <p>{doctor.languages}</p>
            <p>{doctor.qualification}</p>
          </div>
          <div className="timing">
            <span className="days">{doctor.days}</span>
            <br />
            <span className="hours">({doctor.time})</span>
          </div>
          <button className="book-btn" onClick={goToCalender}>
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
