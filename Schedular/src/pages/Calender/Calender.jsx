import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calender.scss";
import BookingForm from "../../components/Bookingform/Bookingform";
import Slot from "../../components/Slot/Slot";
import { useParams } from "react-router-dom";
import doctorList from "../../data/DoctorData";

const Calender = () => {
  const [value, onChange] = useState(new Date());
  const [isSlot, setISlot] = useState(false);
  const [isForm, setIsForm] = useState(false);

  const { id } = useParams();
  const doc = doctorList[parseInt(id) - 1];

  const isFormOpen = () => {
    setIsForm(true);
    console.log("Slot clicked");
  };

  const onClickDate = () => {
    setISlot(true);
  };

  const parseTimeRange = (range) => {
    const [start, end] = range.split("–");

    const to24Hour = (timeStr) => {
      const [time, modifier] = timeStr.trim().split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (modifier === "PM" && hours !== 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`;
    };

    return [to24Hour(start), to24Hour(end)];
  };

  const [startTime, endTime] = parseTimeRange(doc?.time || "08:00 AM–06:00 PM");

  const disablePastDates = ({ date, view }) => {
    if (view === "month") {
      return date < new Date().setHours(0, 0, 0, 0);
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
          tileDisabled={disablePastDates}
        />
        {isSlot && (
          <Slot
            onSlotClick={isFormOpen}
            slotTimeStart={startTime}
            slotTimeEnd={endTime}
          />
        )}
      </div>
      <div className="right">{isForm && <BookingForm />}</div>
    </div>
  );
};

export default Calender;
