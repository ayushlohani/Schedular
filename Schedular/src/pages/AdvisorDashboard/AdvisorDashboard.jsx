import React, { useMemo, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBed, FaUserMd, FaAmbulance } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import "./advisorDashboard.scss";
import { capitalizeWords } from "../../utils/usableFunctions";
import { formatDateToDDMMYYYY } from "../../utils/usableFunctions";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";
import CalendarCard from "../../components/Cards/CalendarCard";
export default function AdvisorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Appointments, setAppointments] = useState([]);
  const [events, setEvents] = useState([]);
  const [domain, setdomain] = useState("");
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(formatDateToDDMMYYYY(today));
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
    setSelectedDate(formatDateToDDMMYYYY(dObj));
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
      <Sidebar searchText={searchText} setSearchText={setSearchText} />

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
          <Table
            Appointments={Appointments}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setSearchText={setSearchText}
            setSelectedDate={setSelectedDate}
            page={page}
            setPage={setPage}
          />
          <CalendarCard
            events={events}
            onDateSelect={(date) => setSelectedDate(date)}
          />
        </section>
      </main>
    </div>
  );
}
