import React from "react";
import "./LandingPage.scss";
import Navbar from "../../components/Navbar/Navbar";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="left">
        <h1>Start Your Journey</h1>
        <button className="google">Sign in with google</button>
        <button>Sign in with Microsoft</button>
      </div>
      <div className="right">
        <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3968301_jqbzkmygmgaeot78dnyc2ym0ohkd75pveth5ntia_blue-wave-calendar-2022-theme.jpg" />
      </div>
    </div>
  );
};

export default LandingPage;
