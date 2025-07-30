import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Schedule from "../Schedule/Schedule";
import AdvisorList from "../AdvisorList/AdvisorList";
import "./Batches.scss";
import BatchCard from "../../components/Cards/BatchCard";
import { weekdays } from "../../data/Usabledata";
import { fetchDataFromApi } from "../../utils/api";
import AdvisorSearch from "../../components/auto-complete-search/AdvisorSearch";

const Batches = () => {
  const { isGroup } = useParams();
  const [batches, setBatches] = useState([]);
  const [filters, setFilters] = useState({
    advisorId: "",
    weekDay: "",
    slotTime: "",
  });

  const { category, topic } = useParams();

  useEffect(() => {
    try {
      fetchDataFromApi("/batch/filter", {
        domain: category,
        topic,
        ...filters,
      }).then((res) => {
        console.log(res);
        console.log(filters);
        setBatches(res.data.batches);
      });
    } catch (err) {
      console.error("Failed to fetch batches", err);
    }
  }, [filters]);

  return (
    <>
      {isGroup !== "group" ? (
        <AdvisorList />
      ) : (
        <div className="batches">
          <h2>Available Batches</h2>

          <div className="filters">
            {/* <input
              type="text"
              placeholder="Search by Advisor"
              value={filters.advisor}
              onChange={(e) =>
                setFilters({ ...filters, advisor: e.target.value })
              }
            /> */}
            <AdvisorSearch setFilters={setFilters} />


            <select
              value={filters.weekDay}
              onChange={(e) =>
                setFilters({ ...filters, weekDay: e.target.value })
              }
            >
              <option value="">All Days</option>
              {weekdays.map((day, index) => (
                <option key={index} value={index}>
                  {day}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Slot Time (e.g. 1100)"
              value={filters.slotTime}
              onChange={(e) =>
                setFilters({ ...filters, slotTime: e.target.value })
              }
            />
          </div>

          {batches.length === 0 ? (
            <p className="no-batches">No batches found.</p>
          ) : (
            <div className="batch-list">
              {batches.map((batch) => (
                <BatchCard key={batch._id} batch={batch} />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Batches;
