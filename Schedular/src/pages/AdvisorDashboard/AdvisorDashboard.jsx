import React, { useMemo, useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { FaBed, FaUserMd, FaAmbulance } from "react-icons/fa";
import { fetchDataFromApi } from "../../utils/api";
import "./advisorDashboard.scss";
import {
  capitalizeWords,
  formatDateToYYYYMMDD,
} from "../../utils/usableFunctions";
import { formatDateToDDMMYYYY } from "../../utils/usableFunctions";
import Sidebar from "../../components/Sidebar/Sidebar";
import Table from "../../components/Table/Table";
import CalendarCard from "../../components/Cards/CalendarCard";
import Stats from "../../components/Stats/Stats";
export default function AdvisorDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Appointments, setAppointments] = useState([]);
  const [events, setEvents] = useState([]);
  const [domain, setdomain] = useState("");
  const [tabeLimit, setTableLimit] = useState(5);
  const today = useMemo(() => new Date(), []);
  const [visibleMonth, setVisibleMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(formatDateToYYYYMMDD(today));
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

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    fetchDataFromApi("/appointment/filter", {
      advisorId: user?._id,
      domain,
      limit: tabeLimit,
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
        <Stats
          stats={[
            { title: "Total Today's Appointment", value: 2 },
            { title: "Total Upcoming Events", value: 10 },
            { title: "Total Ongoing Batches", value: 12 },
          ]}
        />

        <section className="two-col">
          <Table
            TableContent={Appointments}
            tableTitle="Appointments"
            tableHeader={["Name", "Domain", "Status", "Topic", "Date"]}
            SelectedFields={[
              "userId fullname", // It mean nested object field mean p?.userId.fullname
              "domain",
              "status",
              "topic",
              "date",
            ]}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            setSearchText={setSearchText}
            setSelectedDate={setSelectedDate}
            page={page}
            setPage={setPage}
            isMeetLink={true}
            limit={tabeLimit}
            EmptyMessage="No Appointments found"
          />
          <CalendarCard
            events={events}
            onDateSelect={(date) => {
              setSelectedDate(date);
              setPage(1);
            }}
            selectedDate={selectedDate}
          />
        </section>
      </main>
    </div>
  );
}
