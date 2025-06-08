import React from "react";
import "./Slot.scss";

const Slot = ({
  onSlotClick,
  slotTimeStart,
  slotTimeEnd,
  userId,
  dateSelected,
  bookedSlots,
}) => {
  const start = parseInt(slotTimeStart.split(":")[0], 10);
  const end = parseInt(slotTimeEnd.split(":")[0], 10);

  const bookedOnThisDate = bookedSlots[dateSelected] || [];

  const slots = Array.from({ length: end - start }, (_, i) => {
    const hour = start + i;
    const nextHour = hour + 1;
    const label = `${hour.toString().padStart(2, "0")}:00–${nextHour
      .toString()
      .padStart(2, "0")}:00`;
    const isBooked = bookedOnThisDate.includes(hour);

    return (
      <button
        key={label}
        onClick={() => onSlotClick(label)}
        disabled={isBooked}
        title={isBooked ? "Already Booked" : "Available"}
        className={isBooked ? "booked" : ""}
      >
        {label}
      </button>
    );
  });

  return <div className="slot">{slots}</div>;
};

export default Slot;
