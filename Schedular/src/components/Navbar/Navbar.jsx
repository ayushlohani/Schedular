import React from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav">
      <div className="left" onClick={() => navigate("/")}>
        Schedular
      </div>
    </div>
  );
};

export default Navbar;
