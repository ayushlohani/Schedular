import React from "react";
import { FiSearch } from "react-icons/fi";
import "./Sidebar.scss";

export default function Sidebar({ searchText, setSearchText }) {
  const curr_time = new Date();

  return (
    <aside className="sidebar">
      <div className="logo"></div>
      <div className="search-box">
        <FiSearch />
        <input
          placeholder="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <nav>
        <ul>
          <li className="active">Appointments</li>
          <li>Quick Sessions</li>
          <li>Batches</li>
          <li>My Tasks</li>
          <li>Past Events</li>
          <li>Positivity Zone</li>
          <li>Help Center</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="working-track">
        <small>Working Track</small>
        <div className="track-card">
          <div className="dot" />
          <div>
            <div>
              {curr_time.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
