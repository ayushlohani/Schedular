import React, { useState } from "react";
import "./Stats.scss";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { capitalizeWords } from "../../utils/usableFunctions";
import ProfileCard from "../ProfileCard/ProfileCard";

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
          {/* Profile button */}
          <div
            className="profile-btn"
            onClick={() => setProfileShow(true)}
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
        <div className="title">
          <div className="stat-number">{capitalizeWords(user.fullname)}</div>
          <div className="muted">{user.email}</div>
        </div>
      </div>

      {/* Modal for Profile */}
      {profileShow && (
        <div className="modal-overlay" onClick={() => setProfileShow(false)}>
          <div
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
          >
            <ProfileCard user={user} />
            <button className="close-btn" onClick={() => setProfileShow(false)}>
              ✕
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Stats;
