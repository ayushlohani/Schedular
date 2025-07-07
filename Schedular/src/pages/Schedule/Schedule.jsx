import React, { useEffect, useState } from "react";
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { useParams } from "react-router-dom";
import "./Schedule.scss";
import { useSelector } from "react-redux";

const Schedule = ({}) => {
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId, advisorId, category } = useParams();

  const [formData, setFormData] = useState({
    date: "",
    userId: userId,
    advisorId: advisorId,
    slotTime: "",
    details: "",
    status: "pending",
    domain: category,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setLoading(true);
    sendDataToapi(
      "/appointment/createAppointment",
      JSON.stringify(formData),
      "application/json"
    )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDataFromApi("/appointment/filterById", { advisorId }).then((res) => {
      setappointments(res?.data);
    });
  }, []);
  return (
    <div className="appointment">
      <div className="left"></div>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>

        <label>
          Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          User ID:
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Advisor ID:
          <input
            type="text"
            name="advisorId"
            value={formData.advisorId}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Slot Time (24hr):
          <input
            type="number"
            name="slotTime"
            value={formData.slotTime}
            onChange={handleChange}
            min="0"
            max="23"
            required
          />
        </label>

        <label>
          Details:
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Domain:
          <select
            name="domain"
            value={formData.domain}
            onChange={handleChange}
            disabled
          >
            <option value="mental">Mental</option>
            <option value="physical">Physical</option>
            <option value="financial">Financial</option>
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Schedule;
