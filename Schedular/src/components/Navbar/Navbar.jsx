import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoNotificationsOutline } from "react-icons/io5";
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Useraction } from "../../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi("/advisors/getloggedinAdvisor")
      .then((res) => {
        setUser(res.data);
        console.log("User data:", res.data);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    sendDataToapi("advisors/logout")
      .then(() => {
        toast.success("Logout Successfully!");
        setUser(null);
        dispatch(Useraction.logoutUser());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="nav">
      {/* Logo */}
      <div className="left" onClick={() => navigate("/")}>
        <img src="/logo3.png" alt="Logo" />
      </div>

      {/* Links */}
      <div className="right">
        <span
          className="link"
          onClick={() => navigate(user ? "/dashboard" : "/login")}
        >
          Dashboard
        </span>

        {!user && (
          <span
            className="login-btn"
            onClick={() => navigate("/loginConditon")}
          >
            Login
          </span>
        )}

        {user && (
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
              onClick={() => navigate("/profile")}
              title="My Profile"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
