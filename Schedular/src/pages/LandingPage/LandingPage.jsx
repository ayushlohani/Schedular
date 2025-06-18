import React from "react";
import "./LandingPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import { TiVendorMicrosoft } from "react-icons/ti";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="left">
        <h1>Start Your Journey</h1>
        <button className="google">
          <FcGoogle className="icon" /> Sign in with google
        </button>
        <button>
          <TiVendorMicrosoft className="icon" /> Sign in with Microsoft
        </button>
        <span>Or</span>
        <Link className="link">Sign Up with Email</Link>
      </div>
      <div className="right">
        <img src="https://media1.thehungryjpeg.com/thumbs2/ori_3968301_jqbzkmygmgaeot78dnyc2ym0ohkd75pveth5ntia_blue-wave-calendar-2022-theme.jpg" />
      </div>
    </div>
  );
};

export default LandingPage;
