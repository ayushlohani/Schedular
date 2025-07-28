import React from "react";
import "./QuickAppointment.scss";

const QuickAppointment = () => {
  return (
    <div className="quick-appointment">
      <h2>Finding the Right Advisor for You...</h2>
      <p>Please wait while we search for a quick match based on your needs.</p>

      <div className="loading-animation">
        <div className="dot dot1" />
        <div className="dot dot2" />
        <div className="dot dot3" />
      </div>

      <p className="tip">
        Tip: Ensure your profile is complete for faster matches!
      </p>
    </div>
  );
};

export default QuickAppointment;
