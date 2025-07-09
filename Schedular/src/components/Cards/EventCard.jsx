import React from "react";
import "./EventCard.scss";

const EventCard = ({
  date,
  advisor,
  user,
  topic,
  time,
  status,
  details,
  domain,
}) => {
  // Convert time like 1100 → "11:00 AM"
  const formatTime = (slotTime) => {
    if (!slotTime) return "";
    let hr = Math.floor(slotTime / 100);
    let min = slotTime % 100;
    const ampm = hr >= 12 ? "PM" : "AM";
    hr = hr % 12 || 12;
    return `${hr}:${min.toString().padStart(2, "0")} ${ampm}`;
  };
  function capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function capitalizeWords(str) {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <div className="event-card">
      <div className="card-content">
        <div className="card-heading">
          <h1 className="title">
            {`${capitalizeFirst(domain)} (${
              capitalizeFirst(topic) || "Session"
            })`}
          </h1>
          <p className="subtitle">{details || "Consultation"}</p>
          <hr className="divider" />
        </div>

        <div className="card-body">
          <h2 className="doctor-name">
            Dr. {capitalizeWords(advisor) || "Unknown"}
          </h2>
          <p className="time-label">
            {`${formatTime(time)}-${formatTime(time + 100)}`}
          </p>
          <p className="date">Date: {date}</p>
          <p className={`status ${status}`}>
            Status: {capitalizeFirst(status)}
          </p>
        </div>

        <div className="card-footer">
          <a href="#" className="card-link">
            Meet Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
