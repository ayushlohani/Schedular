import React, { useEffect, useState } from "react";
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import "./Schedule.scss";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import CalenderSlots from "../CalenderSlots/CalenderSlots";
import { toast } from "react-toastify";

const Schedule = ({}) => {
  const [appointments, setappointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [advisor, setAdvisor] = useState({});
  const { userId, advisorId, category } = useParams();
  const navigate = useNavigate();

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
        toast.success("Appointment created succesfully!");
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Appointment Failed!Please fill out the data carefully.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("/appointment/filterById", { advisorId, userId })
      .then((res) => {
        setappointments(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    fetchDataFromApi(`/advisors/getAdvisorbyId/${advisorId}`)
      .then((res) => {
        setAdvisor(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  const getDateandTime = (date, slotTime) => {
    setFormData((prev) => ({
      ...prev,
      date,
      slotTime,
    }));
    console.log(formData);
  };
  return (
    <div className="appointment">
      {loading && <Loader />}
      <div className="left">
        <CalenderSlots
          appointments={appointments}
          advisor={advisor}
          DateandTime={getDateandTime}
        />
      </div>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <h2>Book Appointment</h2>
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
