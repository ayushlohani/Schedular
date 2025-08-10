import React, { useMemo, useState, useEffect } from "react";
import { FiSearch, FiSettings, FiBell } from "react-icons/fi";
import { FaBed, FaUserMd, FaAmbulance } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import "./advisorDashboard.scss";
import { capitalizeWords } from "../../utils/usableFunctions";
import { limit } from "firebase/firestore";

const initialAppointments = [];

const initialEvents = [
  // date in yyyy-mm-dd, times in HH:MM 24-hour
  { id: 1, date: "2023-06-08", start: "09:30", end: "10:15", title: "Check up patient", color: "green" },
  { id: 2, date: "2023-06-08", start: "12:00", end: "13:00", title: "Lunch Break", color: "red" },
  { id: 3, date: "2023-06-08", start: "13:30", end: "15:30", title: "Heart Surgery", color: "blue" },
  { id: 4, date: "2023-06-09", start: "10:00", end: "12:00", title: "Evaluation", color: "purple" },
];

function formatDateYMD(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export default function AdvisorDashboard() {
  // data states
  const [user,setUser]=useState(null);
  const [loading, setLoading] = useState(false);
  const [Appointments, setAppointments] = useState(initialAppointments);
  const [events, setEvents] = useState(initialEvents);
  const [domain, setdomain] = useState("");

  // UI states
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(formatDateYMD(today));
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("A-Z");
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  const [page,setPage] = useState(1);

  // form for adding events
  const [newEvent, setNewEvent] = useState({ title: "", start: "09:00", end: "10:00", color: "green" });

  // Derived stats
  const stats = useMemo(() => {
    const beds = 86; // static for demo (could be computed)
    const doctors = 126;
    const ambulances = 32;
    return { beds, doctors, ambulances };
  }, []);
  useEffect(() => {
      setLoading(true);
      fetchDataFromApi("/advisors/getloggedinAdvisor")
        .then((res) => {
          setUser(res?.data);
          console.log(res);
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setLoading(false);
        });
    }, []);

  // Patients filtered & sorted
//   const filteredPatients = useMemo(() => {
//     const q = searchText.trim().toLowerCase();
//     let list = Appointments.filter((p) => {
//       if (!q) return true;
//       return (
//         p.name.toLowerCase().includes(q) ||
//         p.ward.toLowerCase().includes(q) ||
//         (p.priority && p.priority.toLowerCase().includes(q))
//       );
//     });
//     list.sort((a, b) => {
//       if (sortOrder === "A-Z") return a.name.localeCompare(b.name);
//       return b.name.localeCompare(a.name);
//     });
//     return list;
//   }, [Appointments, searchText, sortOrder]);

  // Calendar helpers
  function getMonthDays(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDay = firstDay.getDay(); // 0..6 (Sun..Sat)
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // produce an array of day objects (including blanks for start offset)
    const arr = [];
    for (let i = 0; i < startDay; i++) arr.push(null); // empty
    for (let d = 1; d <= daysInMonth; d++) {
      arr.push(new Date(year, month, d));
    }
    return arr;
  }

  // events map for quick lookup by date
  const eventsByDate = useMemo(() => {
    const map = {};
    for (const ev of events) {
      map[ev.date] = map[ev.date] || [];
      map[ev.date].push(ev);
    }
    return map;
  }, [events]);

  // schedule for selected day
  const dayEvents = useMemo(() => eventsByDate[selectedDate] || [], [eventsByDate, selectedDate]);

  // Month navigation
  function prevMonth() {
    setVisibleMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1));
  }
  function nextMonth() {
    setVisibleMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1));
  }

  // select a date (YYYY-MM-DD string)
  function onSelectDate(dObj) {
    if (!dObj) return;
    setSelectedDate(formatDateYMD(dObj));
  }

  // add event for selectedDate
  function addEvent(e) {
    e.preventDefault();
    if (!newEvent.title) return alert("Enter title");
    const newId = events.length ? Math.max(...events.map((x) => x.id)) + 1 : 1;
    const ev = {
      id: newId,
      date: selectedDate,
      start: newEvent.start,
      end: newEvent.end,
      title: newEvent.title,
      color: newEvent.color,
    };
    setEvents((prev) => [...prev, ev]);
    setNewEvent({ title: "", start: "09:00", end: "10:00", color: "green" });
  }

  function deleteEvent(id) {
    if (!window.confirm("Delete this event?")) return;
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  // This effect sets selectedDate to visibleMonth's first day if current selection no longer in month (optional)
  useEffect(() => {
    const sel = new Date(selectedDate);
    if (sel.getMonth() !== visibleMonth.getMonth() || sel.getFullYear() !== visibleMonth.getFullYear()) {
      // keep selected date (no-op) OR set to first of visible month
      // setSelectedDate(formatDateYMD(visibleMonth));
    }
  }, [visibleMonth, selectedDate]);

  // small helper to convert time to minutes for sorting
  function timeToMinutes(t) {
    const [hh, mm] = t.split(":").map(Number);
    return hh * 60 + mm;
  }
  function handleDateClick(currentDate){
    console.log(currentDate);
  }
  useEffect(() => {
      if (!user) return;
      setLoading(true);
      fetchDataFromApi("/appointment/filter", { advisorId: user?._id, domain,limit: 8,page: page ,date: selectedDate})
        .then((res) => {
          const list = res?.data || [];
          setAppointments(list);
          console.log(list);
          console.warn(user);
        })
        .catch((err) => console.error("Failed to fetch appointments:", err))
        .finally(() => setLoading(false));
    }, [user, domain, page,selectedDate]);

  // sort dayEvents by start time
  const sortedDayEvents = [...dayEvents].sort((a, b) => timeToMinutes(a.start) - timeToMinutes(b.start));

  // patient details view
  const selectedPatient = Appointments.find((p) => p.id === selectedPatientId) || null;

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"></div>

        <div className="search-box">
          <FiSearch />
          <input placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
        </div>

        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Schedules</li>
            <li>Appointments</li>
            <li>Billing</li>
            <li className="divider">DATA VISUALIZATION</li>
            <li>Echarts</li>
            <li>Morris Charts</li>
            <li className="divider">SUPPORT</li>
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

      {/* Main content */}
      <main className="dashboard-content">
        <header className="header">
          <div>
            <h2>Good Morning, {user?.title}{capitalizeWords(user?.fullname)}!</h2>
            <p className="muted">I hope you're in a good mood because there are {Appointments.length} patients waiting for you</p>
          </div>
        </header>

        {/* Stats */}
        <section className="stats">
          <div className="stat-card">
            <div className="icon"><FaBed /></div>
            <div className="stat-body">
              <div className="stat-number">{stats.beds}</div>
              <div className="muted">Available hospital beds</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon"><FaUserMd /></div>
            <div className="stat-body">
              <div className="stat-number">{stats.doctors}</div>
              <div className="muted">Available doctors</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon"><FaAmbulance /></div>
            <div className="stat-body">
              <div className="stat-number">{stats.ambulances}</div>
              <div className="muted">Available ambulance</div>
            </div>
          </div>
        </section>

        {/* Patients & Calendar */}
        <section className="two-col">
          <div className="patients-card">
            <div>
            <div className="section-header">
              <div>
                <h3>Appointments</h3>
                <div className="muted small">This is your several latest Appointments list</div>
              </div>
              <div className="controls">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                  <option>A - Z</option>
                  <option>Z - A</option>
                </select>
                <button className="link" onClick={() => { setSearchText(""); setSortOrder("A-Z"); setSelectedDate('') }}>See All</button>
              </div>
            </div>

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
                  <tr key={p.id} className={p.id === selectedPatientId ? "selected" : ""}>
                    <td>
                      <div className="patient-name">{capitalizeWords(p.userId?.fullname)}</div>
                    </td>
                    <td className="center">{capitalizeWords(p.domain)}</td>
                    <td className="center">{capitalizeWords(p.status)}</td>
                    <td className="center">{capitalizeWords(p.topic)}</td>
                    <td className="center">{p.date}</td>
                    <td className="center"><a href={p.meetlink} target="_blank" className="join">Join</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="pagination">
                <button onClick={()=>{setPage(page+1)}} disabled={page===1} >Previous</button>
                <button onClick={()=>{setPage(page-1)}} disabled={Appointments.length<8}>Next</button>
            </div>
          </div>

          <aside className="calendar-card">
            <div className="cal-header">
              <h3>{visibleMonth.toLocaleString(undefined, { month: "long", year: "numeric" })}</h3>
              <div className="cal-nav">
                <button onClick={prevMonth}>‹</button>
                <button onClick={nextMonth}>›</button>
              </div>
            </div>

            <div className="weekdays">
              {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((w) => <div key={w}>{w}</div>)}
            </div>

            <div className="calendar-grid">
              {getMonthDays(visibleMonth).map((d, idx) => {
                if (!d) return <div key={idx} className="blank" />;
                const ymd = formatDateYMD(d);
                const has = eventsByDate[ymd] && eventsByDate[ymd].length > 0;
                const active = ymd === selectedDate;
                return (
                  <button key={idx} className={`day ${active ? "active" : ""}`} onClick={() => onSelectDate(d)}>
                    <div className="day-num">{d.getDate()}</div>
                    {has && <div className="dots">
                      {(eventsByDate[ymd] || []).slice(0,3).map((ev) => <span key={ev.id} className={`dot ${ev.color}`}></span>)}
                    </div>}
                  </button>
                );
              })}
            </div>
             <div className="next-appointment">
                Next Appointment
              </div>
          </aside>
        </section>
      </main>
    </div>
  );
}
