import React from "react";
import "./LandingPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import { TiVendorMicrosoft } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../components/Firebase/Firebase";
import { PositivityZone } from "../../components/PositivityZone/PositivityZone";
import { BlogData } from "../../data/BlogData";
import { News } from "../../data/News";
import { FaArrowDown } from "react-icons/fa";

const googleProvider = new GoogleAuthProvider();

const LandingPage = () => {
  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
  };

  const scrollToPositivity = () => {
    const section = document.getElementById("positivity-start");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="main">
      <div className="landingPage">
        <div className="left">
          <h1>Start Your Journey</h1>
          <button className="google" onClick={SignInWithGoogle}>
            <FcGoogle className="icon" /> Sign in with Google
          </button>
          <button>
            <TiVendorMicrosoft className="icon" /> Sign in with Microsoft
          </button>
          <span>Or</span>
          <Link className="link" to="/user/Signin">
            <HiMail className="icon" />
            Sign Up with Email
          </Link>
        </div>
        <div className="right">
          <img src="calender2.png" />
        </div>
      </div>

      {/* <div id="positivity-start" className="positivity-heading">
        <h1>Positivity Zone</h1>
        {/*  }
      </div> */}
      <div className="positivity">
  <div id="positivity-start" className="positivity-heading">
    <u><h1 className="main-title">Positivity Zone</h1></u>
    <p className="sub-title">
      A space to uplift your spirit, inspire your thoughts, and brighten your day 🌈
    </p>
  </div>

  <div className="scroll-icon" onClick={scrollToPositivity}>
    <FaArrowDown />
  </div>
</div>



      <div className="positivity-zone-section">
        {BlogData.map((item, index) => (
          <PositivityZone
            key={index}
            image={item.image}
            category={item.category}
            title={item.title}
            description={item.description}
            author={item.author}
            avatar={item.avatar}
            time={item.time}
          />
        ))}
      </div>

      <div>
        <h1>Articles</h1>
      </div>

      <div className="positivity-zone-section">
        {News.map((item, index) => (
          <PositivityZone
            key={index}
            image={item.image}
            category={item.category}
            title={item.title}
            description={item.description}
            author={item.author}
            avatar={item.avatar}
            time={item.time}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
