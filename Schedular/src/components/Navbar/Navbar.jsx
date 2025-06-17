import React, { useState, useRef } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

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
        Schedular
      </div>
      <div
        className="profile-container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="profile">
          <FaUser />
        </div>
        {showLogout && (
          <div className="logout-card">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
