import React from "react";
import "./Slot.scss";

const Slot = ({ onSlotClick }) => {
  const slots = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);

  return (
    <div className="slot">
      {slots.map((i) => (
        <button key={i} onClick={onSlotClick}>
          {i}
        </button>
      ))}
    </div>
  );
};

export default Slot;
