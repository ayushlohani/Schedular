import React from "react";
import "./LandingPage.scss";
import Navbar from "../../components/Navbar/Navbar";
import { FcGoogle } from "react-icons/fc";
import { TiVendorMicrosoft } from "react-icons/ti";
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../components/Firebase/Firebase";
const googleProvider = new GoogleAuthProvider();

const LandingPage = () => {
  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider);
    navigate("/");
  };
  return (
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
  );
};

export default LandingPage;
