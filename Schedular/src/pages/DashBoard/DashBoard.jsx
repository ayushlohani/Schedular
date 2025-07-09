import React, { useState, useEffect } from "react";
import EventCard from "../../components/Cards/EventCard";
import { useNavigate } from "react-router-dom";
import "./DashBoard.scss";
import { Useraction } from "../../store/userSlice";
import { useSelector } from "react-redux";
import { fetchDataFromApi } from "../../utils/api";

export default function DashBoard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const userData = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  console.log(userData);

  const goToCategory = () => {
    navigate("/Category");
  };

  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  const toggleProfileFalse = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("appointment/getallAppointment")
      .then((res) => {
        console.log(res);w
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize(); // check on load
    window.addEventListener("resize", handleResize); // recheck on resize
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔽 Utility to render event section conditionally
  const renderSection = (title, count) => (
    <div className="event-section">
      <h2>{title}</h2>
      <hr className="divider" />
      <div className="event-card-list">
        {[...Array(count)].map((_, i) => {
          const card = <EventCard key={i} />;
          if (!isMobile) return card;

          return (
            <div className="event-list-item" key={i}>
              <div
                className="list-title"
                onClick={(e) => e.currentTarget.classList.toggle("expanded")}
              >
                {card.props.title || `${title} ${i + 1}`}
                <span className="arrow">▼</span>
              </div>
              <div className="list-body">{card}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-container">
        <div className="top-bar">
          <a className="new-meeting" onClick={goToCategory}>
            + New Meeting
          </a>
          <div className="profile-toggle" onClick={toggleProfile}>👤</div>
        </div>

        {renderSection("Upcoming Events", 3)}
        {renderSection("Learning", 14)}
        {renderSection("Past Events", 4)}
      </div>

      <div className={`profile-panel ${showProfile ? "show-on-mobile" : ""}`}>
        <div  className="top-profile-bar" onClick={toggleProfileFalse}><a>x</a></div>
        <div className="profile-photo">
          <div className="avatar-ring-wrapper">
            <svg className="avatar-ring">
              <circle className="bg" cx="95" cy="95" r="90" />
              <circle className="fg" cx="95" cy="95" r="90" />
            </svg>
            <div className="avatar">
              <img
                src={userData.profilepic}
                alt="Profile"
              />
            </div>
          </div>
          <div className="name">{userData.fullname}</div>
          <div className="role">21 Years</div>
        </div>
        <hr className="divider" />
        <div className="profile-details">
          <div>
            <strong>Email:</strong> akash@example.com
          </div>
          <div>
            <strong>Phone:</strong> +91 98765 43210
          </div>
          <div>
            <strong>Location:</strong> Bengaluru, India
          </div>
          <div>
            <strong>Experience:</strong> 3 Years
          </div>
        </div>
      </div>
    </div>
  );
}
