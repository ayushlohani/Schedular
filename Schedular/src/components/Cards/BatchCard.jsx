import React from "react";
import "./BatchCard.scss";
import { weekdays } from "../../data/Usabledata";

const formatTime = (time) => {
  const hours = Math.floor(time / 100);
  const minutes = time % 100;
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
};

function capitalizeWords(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

const BatchCard = ({ batch }) => {
  const {
    topic,
    description,
    meetlink,
    domain,
    advisorId,
    slotTime,
    weekDay,
    maxAttendee,
    startDate,
    learningMaterial,
    attendees = [],
  } = batch;

  const dayNames = weekdays;

  return (
    <div className="batch-card">
      <div className="left">
        <img src={advisorId.profilepic} alt="" />
      </div>
      <div className="right">
        <div className="header">
          <h3>{`${advisorId.title} ${capitalizeWords(advisorId.fullname)}`}</h3>
          <p>{advisorId.email}</p>
        </div>
        <p>
          <strong>Starting From:</strong> {formatDateToDDMMYYYY(startDate)}
        </p>
        <p>
          <strong>Day:</strong> {dayNames[weekDay]}
        </p>
        <p>
          <strong>Slot Time:</strong>{" "}
          {`${formatTime(slotTime)}-${formatTime(slotTime + 100)}`}
        </p>
        <p>
          <strong>Slot Available:</strong> {attendees.length}/{maxAttendee}
        </p>
        {description && (
          <p>
            <strong>Description:</strong> {description}
          </p>
        )}
        <div className="bottom">
          {learningMaterial && (
            <p>
              <a
                href={learningMaterial}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learning Material
              </a>
            </p>
          )}
          <a
            href={meetlink}
            target="_blank"
            rel="noopener noreferrer"
            className="join-link"
          >
            Join Batch
          </a>
        </div>
      </div>
    </div>
  );
};

export default BatchCard;
