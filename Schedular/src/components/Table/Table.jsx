import React from "react";
import { capitalizeWords } from "../../utils/usableFunctions";
import "./Table.scss";

export default function Table({
  tableHeader = [],
  TableContent = [],
  SelectedFields = [],
  sortOrder,
  setSortOrder,
  setSearchText,
  setSelectedDate,
  page,
  setPage,
  limit = 8,
  tableTitle = "Table",
  EmptyMessage = "No Content found",
  isMeetLink = false,
}) {
  const resetFilters = () => {
    setSearchText("");
    setSortOrder("A - Z");
    setSelectedDate("");
  };

  return (
    <div className="main-card">
      <div>
        <div className="section-header">
          <h3>
            {tableTitle} ({TableContent.length})
          </h3>
          <div className="controls">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option>A - Z</option>
              <option>Z - A</option>
            </select>
            <button className="link" onClick={resetFilters}>
              See All
            </button>
          </div>
        </div>

        {TableContent.length === 0 ? (
          <div className="no-content">{EmptyMessage}</div>
        ) : (
          <table className="main-table">
            <thead>
              <tr>
                {tableHeader.map((header, index) => (
                  <th key={index} className="center">
                    {capitalizeWords(header)}
                  </th>
                ))}
                {isMeetLink && <th className="center">Link</th>}
              </tr>
            </thead>
            <tbody>
              {TableContent.map((p, idx) => (
                <tr key={p.id || idx}>
                  {SelectedFields.map((field, index) => (
                    <td key={index} className="center">
                      {(() => {
                        const path = field.split(" ");
                        let value = p;
                        for (const key of path) value = value?.[key];
                        return capitalizeWords(value) ?? "-";
                      })()}
                    </td>
                  ))}

                  {isMeetLink && (
                    <td className="center">
                      <a
                        href={p.meetlink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="join"
                      >
                        Join
                      </a>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {TableContent.length > 0 && (
        <div className="pagination">
          <button onClick={() => setPage(page - 1)} hidden={page === 1}>
            {"< Previous"}
          </button>
          <button
            onClick={() => setPage(page + 1)}
            hidden={TableContent.length < limit}
          >
            {"Next >"}
          </button>
        </div>
      )}
    </div>
  );
}
