import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Useraction } from "../../store/userSlice";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedin, setLoggedin] = useState(false);
  const [profileShow, setProfileShow] = useState(false);

  const user = useSelector((state) => state.user);
  const role = useSelector((state) => state.role);

  useEffect(() => {
    if (user && user._id) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
  });

  return (
    <div className="nav">
      {/* Logo */}
      <div className="left" onClick={() => navigate("/")}>
        <img src="/logo3.png" alt="Logo" />
      </div>

      {/* Links */}
      <div className="right">
        {isLoggedin ? (
          <span
            className="link"
            onClick={() => navigate(isLoggedin ? "/dashboard" : "/login")}
          >
            Dashboard
          </span>
        ) : (
          <span className="link" onClick={() => navigate("/advisor/login")}>
            Login as Advisor{" "}
          </span>
        )}

        {!isLoggedin && (
          <span className="login-btn" onClick={() => navigate("/user/login")}>
            Login as User
          </span>
        )}

        {isLoggedin && (
          <div className="user-actions">
            {/* Notification Icon */}
            <IoNotificationsOutline
              size={24}
              className="notification-icon"
              onClick={() => navigate("/notifications")}
            />

            {/* Profile Picture */}
            <div
              className="profile-btn"
              onClick={() => navigate("/dashboard")}
              title="My Profile"
              onMouseOver={() => setProfileShow(true)}
              onMouseLeave={() => setProfileShow(false)}
            >
              {user.profilepic ? (
                <img
                  src={user.profilepic}
                  alt="Profile"
                  className="profile-pic"
                />
              ) : (
                <FaUserCircle size={28} />
              )}

              {profileShow && <ProfileCard />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
