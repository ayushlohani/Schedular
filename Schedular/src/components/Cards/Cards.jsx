import React from "react";
import "./Cards.scss";
import { useNavigate } from "react-router-dom";

const Cards = ({ doctor }) => {
  const navigate = useNavigate();
  const goToCalender = () => {
    navigate(`/Calender/${doctor.id}`);
  };

  const fullName = doctor.role === "Doctor" ? `Dr ${doctor.name}` : doctor.name;
  const daysRange = `${doctor.startDay} - ${doctor.endDay}`;
  const languages = Array.isArray(doctor.languages)
    ? doctor.languages.join(", ")
    : doctor.languages;

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour);
    const suffix = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 === 0 ? 12 : h % 12;
    return `${formattedHour}:${minute} ${suffix}`;
  };

  const timeRange = `${formatTime(doctor.slotStarttime)} - ${formatTime(
    doctor.slotEndTime
  )}`;

  return (
    <div className="cards">
      <div className="card-container">
        <div className="left-section">
          <div className="avatar">
            <img src={doctor.image} alt={doctor.name} />
          </div>
        </div>
        <div className="right-section">
          <h2>{fullName}</h2>
          <p className="speciality">
            {doctor.specialization} | <span>{doctor.experience} years</span>
          </p>
          <hr className="divider" />
          <div className="details">
            <p>{doctor.clinic}</p>
            <p>{languages}</p>
            <p>{doctor.qualification}</p>
          </div>
          <div className="timing">
            <span className="days">{daysRange}</span>
            <br />
            <span className="hours">({timeRange})</span>
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
