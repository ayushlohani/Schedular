import React from "react";
import { capitalizeWords } from "../../utils/usableFunctions";
import "./Table.scss";
import { toast } from "react-toastify";
import { updateDatatoapi } from "../../utils/api";

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
  advisorId = "",
}) {
  const resetFilters = () => {
    setSearchText("");
    setSortOrder("A - Z");
    setSelectedDate("");
  };
  const handleQuickJoin = async (id) => {
    try {
      await updateDatatoapi(
        `/appointment/joinQuickAppointment/${id}?advisorId=${advisorId}`,
        "application/json"
      ).then((res) => {
        window.open(res?.data?.data?.meetlink, "_blank");
        // reload to see updated list
      });
      toast.success("Joined appointment successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to join appointment");
    }
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
                      {p.isQuick ? (
                        <a
                          href={p.status === "pending" ? p.meetlink : "#"}
                          target={p.status === "pending" ? "_blank" : ""}
                          rel="noopener noreferrer"
                          className="join"
                          onClick={() => {
                            if (p.status == "pending") handleQuickJoin(p._id);
                          }}
                        >
                          {p.status === "pending" ? "Join" : "-"}
                        </a>
                      ) : (
                        <a
                          href={p.meetlink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="join"
                        >
                          Join
                        </a>
                      )}
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
          <button
            onClick={() => setPage(page - 1)}
            hidden={page === 1}
            className="pagenav"
          >
            {"< Previous"}
          </button>
          <button
            onClick={() => setPage(page + 1)}
            hidden={TableContent.length < limit}
            className="pagenav"
          >
            {"Next >"}
          </button>
        </div>
      )}
    </div>
  );
}
