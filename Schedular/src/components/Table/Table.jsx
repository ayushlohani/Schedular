import React from "react";
import { capitalizeWords } from "../../utils/usableFunctions";
import "./Table.scss";

export default function Table({
  Appointments,
  sortOrder,
  setSortOrder,
  setSearchText,
  setSelectedDate,
  page,
  setPage,
}) {
  return (
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
  );
}
