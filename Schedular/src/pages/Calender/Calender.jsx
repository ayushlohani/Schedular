import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calender.scss";
import BookingForm from "../../components/Bookingform/Bookingform";
import Slot from "../../components/Slot/Slot";

const Calender = () => {
  const [value, onChange] = useState(new Date());
  const [isSlot, setISlot] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const isFormOpen = () => {
    setIsForm(true);
    console.warn("Clciked");
  };
  const onClickDate = (val, event) => {
    setISlot(true);
    console.log(val);
  };

  const disableWeekends = ({ date, view }) => {
    // Disable only in month view
    if (view === "month") {
      const day = date.getDay();
      return day === 0 || day === 6; // Sunday = 0, Saturday = 6
    }
    return false;
  };

  return (
    <div className="calender">
      <div className="left">
        <Calendar
          onChange={onChange}
          value={value}
          onClickDay={onClickDate}
          tileDisabled={disableWeekends}
        />
        {isSlot && <Slot onSlotClick={isFormOpen} />}
      </div>
      <div className="right">{isForm && <BookingForm />}</div>
    </div>
  );
};

export default Calender;
