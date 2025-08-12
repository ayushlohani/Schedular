import React, { useState } from "react";
import "./Stats.scss";
import { IoNotificationsOutline } from "react-icons/io5";
import ProfileCard from "../ProfileCard/ProfileCard";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { capitalizeWords } from "../../utils/usableFunctions";

const Stats = ({ stats }) => {
  const user = useSelector((state) => state.user);
  const [profileShow, setProfileShow] = useState(false);
  return (
    <section className="stats">
      {stats.map((stat, index) => (
        <div className="stat-card" key={index}>
          <div className="stat-body">
            <div className="stat-number">{stat.value}</div>
            <div className="muted">{stat.title}</div>
          </div>
        </div>
      ))}
      <div className="stat-card center">
        <div className="user-actions">
          {/* Notification Icon */}
          {/* <IoNotificationsOutline
            size={24}
            className="notification-icon"
            onClick={() => navigate("/notifications")}
          /> */}

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
        <div className="title">
          <div className="stat-number">{capitalizeWords(user.fullname)}</div>
          <div className="muted">{user.email}</div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
