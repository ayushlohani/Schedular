import React, { useState } from "react";
import "./Slot.scss";

const Slot = ({
  onSlotClick,
  slotTimeStart,
  slotTimeEnd,
  disabledSlots = [],
}) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const start = parseInt(slotTimeStart.split(":")[0], 10);
  const end = parseInt(slotTimeEnd.split(":")[0], 10);

  const slots = Array.from({ length: end - start }, (_, i) => {
    const hour = start + i;
    const nextHour = hour + 1;
    const slotStart = `${hour.toString().padStart(2, "0")}:00`;
    const slotEnd = `${nextHour.toString().padStart(2, "0")}:00`;
    return {
      time: `${slotStart}–${slotEnd}`,
      startTime: slotStart,
    };
  });

  const handleClick = (time) => {
    setSelectedTime(time);
    onSlotClick(time);
  };

  return (
    <div className="slot">
      {slots.map(({ time, startTime }) => (
        <button
          key={time}
          disabled={disabledSlots.includes(startTime)}
          className={selectedTime === time ? "active" : ""}
          onClick={() => handleClick(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
};

export default Slot;
