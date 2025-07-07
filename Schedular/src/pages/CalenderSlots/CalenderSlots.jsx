import React, { useState } from "react";
import Calendar from "react-calendar";
import Slot from "../../components/Slot/Slot";
import "./CalenderSlots.scss";
import { fetchDataFromApi } from "../../utils/api";

const CalenderSlots = ({ appointments, advisor, DateandTime }) => {
  const [isSlot, setIsSlot] = useState(false);
  const [date, setDate] = useState("");
  const [slotTime, setSlotTime] = useState();
  const [disabledSlots, setDisabledSlots] = useState([]);

  function formatTime(num) {
    const hours = String(Math.floor(num / 100)).padStart(2, "0");
    const minutes = String(num % 100).padStart(2, "0");
    return `${hours}:${minutes}`;
  }
  function parseTime(str) {
    const [hours, minutes] = str.split(":").map(Number);
    return hours * 100 + minutes;
  }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const disablePastDates = ({ date, view }) => {
    if (view === "month") {
      return date < new Date().setHours(0, 0, 0, 0);
    }
    return false;
  };

  const onClickDate = (date) => {
    setIsSlot(true);
    setDate(formatDate(date));
    setDisabledSlots([]);

    fetchDataFromApi("/appointment/filterBydate", {
      date: formatDate(date),
    }).then((res) => {
      res?.data?.map((x) => {
        setDisabledSlots([...disabledSlots, formatTime(x?.slotTime)]);
      });

      console.log(disabledSlots);
    });
  };

  const slotClick = (time) => {
    setSlotTime(parseTime(time.substr(0, 4)));
    DateandTime(date, slotTime);
    console.log("Slot Clicked", slotTime);
  };
  return (
    <div className="cal">
      <Calendar onClickDay={onClickDate} tileDisabled={disablePastDates} />
      {isSlot && (
        <Slot
          onSlotClick={slotClick}
          slotTimeStart={formatTime(advisor?.availability?.slotStartTime)}
          slotTimeEnd={formatTime(advisor?.availability?.slotEndTime)}
          disabledSlots={disabledSlots}
        />
      )}
    </div>
  );
};

export default CalenderSlots;
