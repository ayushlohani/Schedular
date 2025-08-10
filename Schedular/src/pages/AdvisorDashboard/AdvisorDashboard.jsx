import React, { useMemo, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBed, FaUserMd, FaAmbulance } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import "./advisorDashboard.scss";
import { capitalizeWords } from "../../utils/usableFunctions";

const initialAppointments = [];

const initialEvents = [
  {
    id: 1,
    date: "2023-06-08",
    start: "09:30",
    end: "10:15",
    title: "Check up patient",
    color: "green",
  },
  {
    id: 2,
    date: "2023-06-08",
    start: "12:00",
    end: "13:00",
    title: "Lunch Break",
    color: "red",
  },
  {
    id: 3,
    date: "2023-06-08",
    start: "13:30",
    end: "15:30",
    title: "Heart Surgery",
    color: "blue",
  },
  {
    id: 4,
    date: "2023-06-09",
    start: "10:00",
    end: "12:00",
    title: "Evaluation",
    color: "purple",
  },
];

function formatDateYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function AdvisorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Appointments, setAppointments] = useState(initialAppointments);
  const [events, setEvents] = useState(initialEvents);
  const [domain, setdomain] = useState("");
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(formatDateYMD(today));
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [selectedPatientId] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("/advisors/getloggedinAdvisor")
      .then((res) => setUser(res?.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  function getMonthDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const arr = [];
    for (let i = 0; i < startDay; i++) arr.push(null);
    for (let d = 1; d <= daysInMonth; d++) arr.push(new Date(year, month, d));
    return arr;
  }

  const eventsByDate = useMemo(() => {
    const map = {};
    for (const ev of events) {
      map[ev.date] = map[ev.date] || [];
      map[ev.date].push(ev);
    }
    return map;
  }, [events]);

  function prevMonth() {
    setVisibleMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }
  function nextMonth() {
    setVisibleMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }
  function onSelectDate(dObj) {
    if (!dObj) return;
    setSelectedDate(formatDateYMD(dObj));
  }

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchDataFromApi("/appointment/filter", {
      advisorId: user?._id,
      domain,
      limit: 8,
      page,
      date: selectedDate,
    })
      .then((res) => setAppointments(res?.data || []))
      .catch((err) => console.error("Failed to fetch appointments:", err))
      .finally(() => setLoading(false));
  }, [user, domain, page, selectedDate]);

  return (
    <div className="dashboard">
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

      <main className="dashboard-content">
        <header className="header"></header>
        <section className="stats">
          <div className="stat-card">
            <div className="stat-body">
              <div className="stat-number">2</div>
              <div className="muted">Total Today's Appointment</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-body">
              <div className="stat-number">10</div>
              <div className="muted">Total Upcoming Events</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="icon"></div>
            <div className="stat-body">
              <div className="stat-number">12</div>
              <div className="muted">Total Ongoing Batches</div>
            </div>
          </div>
        </section>

        <section className="two-col">
          <div className="patients-card">
            <div>
              <div className="section-header">
                <div>
                  <h3>Appointments({Appointments.length})</h3>
                </div>
                <div className="controls">
                  <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option>A - Z</option>
                    <option>Z - A</option>
                  </select>
                  <button
                    className="link"
                    onClick={() => {
                      setSearchText("");
                      setSortOrder("A-Z");
                      setSelectedDate("");
                    }}
                  >
                    See All
                  </button>
                </div>
              </div>
              {Appointments.length === 0 ? (
                <div className="no-appointments">No appointments found</div>
              ) : (
                <table className="patients-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Domain</th>
                      <th>Status</th>
                      <th>Topic</th>
                      <th>Date</th>
                      <th>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Appointments.map((p) => (
                      <tr key={p.id}>
                        <td className="center">
                          {capitalizeWords(p.userId?.fullname)}
                        </td>
                        <td className="center">{capitalizeWords(p.domain)}</td>
                        <td className="center">{capitalizeWords(p.status)}</td>
                        <td className="center">{capitalizeWords(p.topic)}</td>
                        <td className="center">{p.date}</td>
                        <td className="center">
                          <a href={p.meetlink} target="_blank" className="join">
                            Join
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
            <div className="pagination">
              <button onClick={() => setPage(page - 1)} hidden={page === 1}>
                {"< Previous"}
              </button>
              <button
                onClick={() => setPage(page + 1)}
                hidden={Appointments.length < 8}
              >
                {"Next >"}
              </button>
            </div>
          </div>

          <aside className="calendar-card">
            <div className="cal-header">
              <h3>
                {visibleMonth.toLocaleString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </h3>
              <div className="cal-nav">
                <button onClick={prevMonth}>‹</button>
                <button onClick={nextMonth}>›</button>
              </div>
            </div>
            <div className="weekdays">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((w) => (
                <div key={w}>{w}</div>
              ))}
            </div>
            <div className="calendar-grid">
              {getMonthDays(visibleMonth).map((d, idx) => {
                if (!d) return <div key={idx} className="blank" />;
                const ymd = formatDateYMD(d);
                const has = eventsByDate[ymd] && eventsByDate[ymd].length > 0;
                const active = ymd === selectedDate;
                return (
                  <button
                    key={idx}
                    className={`day ${active ? "active" : ""}`}
                    onClick={() => onSelectDate(d)}
                  >
                    <div className="day-num">{d.getDate()}</div>
                    {has && (
                      <div className="dots">
                        {(eventsByDate[ymd] || []).slice(0, 3).map((ev) => (
                          <span
                            key={ev.id}
                            className={`dot ${ev.color}`}
                          ></span>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
