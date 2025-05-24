import React from "react";
import "./Slot.scss";

const Slot = ({ onSlotClick, slotTimeStart, slotTimeEnd }) => {
  const start = parseInt(slotTimeStart.split(":")[0], 10);
  const end = parseInt(slotTimeEnd.split(":")[0], 10);

  const slots = Array.from({ length: end - start + 1 }, (_, i) => {
    const hour = start + i;
    return `${hour}:00`;
  });

  return (
    <div className="slot">
      {slots.map((time) => (
        <button key={time} onClick={() => onSlotClick(time)}>
          {time}
        </button>
      ))}
    </div>
  );
};

export default Slot;
