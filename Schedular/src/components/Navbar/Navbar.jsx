import React, { useState, useRef } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { MdOutlineAutoGraph } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [showLogout, setShowLogout] = useState(false);
  const timeoutRef = useRef(null);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowLogout(false);
    }, 2000); // 2 seconds delay
  };

  return (
    <div className="nav">
      <div className="left" onClick={() => navigate("/Home")}>
        <img src="logo.png" />
      </div>
      <div className="right">
        <Link className="link" to="/dashboard">
          Dashboard
        </Link>
        <Link className="login-btn" to="/dashboard">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
