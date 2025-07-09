import React, { useState, useEffect } from "react";
import EventCard from "../../components/Cards/EventCard";
import { useNavigate } from "react-router-dom";
import "./DashBoard.scss";
import { fetchDataFromApi } from "../../utils/api";
import { useSelector } from "react-redux";

export default function DashBoard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user?.data);

  const goToCategory = () => {
    navigate("/Category");
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleProfileFalse = () => {
    setShowProfile(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("/appointment/filterById", { userId: user?._id })
      .then((res) => {
        const list = res?.data || [];
        setAppointments(list);
        console.warn(user);
      })
      .catch((err) => console.error("Failed to fetch appointments:", err))
      .finally(() => setLoading(false));
  }, []);

  const renderAppointmentsSection = (title, dataList = []) => (
    <div className="event-section">
      <h2>{title}</h2>
      <hr className="divider" />
      <div className="event-card-list">
        {loading ? (
          <p>Loading...</p>
        ) : dataList.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          dataList.map((item, index) => {
            const card = (
              <EventCard
                key={item._id}
                date={item.date}
                advisor={item.advisorId?.fullname}
                user={item.userId?.fullname}
                topic={item.topic}
                time={item.slotTime}
                status={item.status}
                details={item.details}
                domain={item.domain}
              />
            );

            if (!isMobile) return card;

            return (
              <div className="event-list-item" key={item._id}>
                <div
                  className="list-title"
                  onClick={(e) => e.currentTarget.classList.toggle("expanded")}
                >
                  {item.topic || `${title} ${index + 1}`}
                  <span className="arrow">▼</span>
                </div>
                <div className="list-body">{card}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const renderStaticSection = (title, count) => (
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
          <div className="profile-toggle" onClick={toggleProfile}>
            👤
          </div>
        </div>

        {renderAppointmentsSection("Upcoming Events", appointments)}
        {renderStaticSection("Learning", 14)}
        {renderStaticSection("Past Events", 4)}
      </div>

      <div className={`profile-panel ${showProfile ? "show-on-mobile" : ""}`}>
        <div className="top-profile-bar" onClick={toggleProfileFalse}>
          <a>x</a>
        </div>
        <div className="profile-photo">
          <div className="avatar-ring-wrapper">
            <svg className="avatar-ring">
              <circle className="bg" cx="95" cy="95" r="90" />
              <circle className="fg" cx="95" cy="95" r="90" />
            </svg>
            <div className="avatar">
              <img
                src={user?.profilepic || "https://via.placeholder.com/150"}
                alt="Profile"
              />
            </div>
          </div>
          <div className="name">{user?.fullname || "User"}</div>
          <div className="role">
            {user?.dob
              ? `${Math.floor(
                  (new Date() -
                    new Date(
                      user.dob.slice(4, 8),
                      user.dob.slice(2, 4) - 1,
                      user.dob.slice(0, 2)
                    )) /
                    (1000 * 60 * 60 * 24 * 365)
                )} Years`
              : ""}
          </div>
        </div>
        <hr className="divider" />
        <div className="profile-details">
          <div>
            <strong>Email:</strong> {user?.email}
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
