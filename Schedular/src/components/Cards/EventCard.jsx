import React from "react";
import "./EventCard.scss";

const EventCard = () => {
  return (
    <div className="event-card">
      <div className="card-content">
        <div className="card-heading">
          <h1 className="title"> Mental </h1>
          <p className="subtitle">Quick Session</p>
          <hr className="divider" />
        </div>
        <div className="card-body">
          <h2 className="doctor-name">Dr. Ayesha Sharma</h2>
          <p className="time-label">Time Slots:</p>
          <ul className="time-slots">
            <li>10:00 AM - 11:00 AM</li>
          </ul>
        </div>

        <div className="card-footer">
          <a href="#" className="card-link">Meet Link</a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
