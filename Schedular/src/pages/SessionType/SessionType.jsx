import React from "react";
import "./SessionType.scss";
import { useNavigate } from "react-router-dom";

const SessionType = () => {
  const navigate = useNavigate();

  const onNav = (path) => {
    navigate(path);
  };
  return (
    <div className="Category">
      <h1>How do you need help for?</h1>
      <div className="cat">
        <div onClick={() => onNav("quick-session")} className="cat-cont">
          <img src="/QuickSession.png"></img>
          <span>Quick Session</span>
        </div>
        <div onClick={() => onNav("habbit-learning")} className="cat-cont">
          <img src="/HabitSchedular.png"></img>
          <span>Habbit Schedular</span>
        </div>
        <div onClick={() => onNav("personalised")} className="cat-cont">
          <img src="/Personailsed.png"></img>
          <span>Personalised Learning</span>
        </div>
      </div>
    </div>
  );
};

export default SessionType;
