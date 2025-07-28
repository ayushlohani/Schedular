import React from "react";
import "./HabitSchedular.scss";
import { useNavigate } from "react-router-dom";

const HabitSchedular = () => {
  const navigate = useNavigate();

  const onNav = (path) => {
    navigate(path);
  };
  return (
    <div className="habit">
      <h1>What Type of Scheduler Do You Need?</h1>
      <div className="cat">
        <div onClick={() => onNav("group")} className="cat-cont">
          <img src="/Group.png"></img>
          <span>Group Schedular</span>
        </div>
        <div onClick={() => onNav("personal")} className="cat-cont">
          <img src="/personalized.png"></img>
          <span>Personalised Schedular</span>
        </div>
      </div>
    </div>
  );
};

export default HabitSchedular;
