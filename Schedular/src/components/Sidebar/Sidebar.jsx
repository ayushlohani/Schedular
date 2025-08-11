import React from "react";
import { FiSearch } from "react-icons/fi";
import "./Sidebar.scss";

export default function Sidebar({ searchText, setSearchText }) {
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
          <li className="active">Dashboard</li>
          <li>Appointments</li>
          <li>Quick Sessions</li>
          <li>Batches</li>
          <li>My Tasks</li>
          <li>Past Events</li>
          <li>Help Center</li>
          <li>Settings</li>
        </ul>
      </nav>
      <div className="working-track">
        <small>Working Track</small>
        <div className="track-card">
          <div className="dot" />
          <div>
            <div>Wed, 8 June</div>
            <div className="muted">06:23:53</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
