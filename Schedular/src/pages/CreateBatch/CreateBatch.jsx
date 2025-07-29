import React, { useState } from "react";
import "./CreateBatch.scss";
import { sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { topicsData } from "../../data/topicsList";
import { weekdays } from "../../data/Usabledata";

const CreateBatch = () => {
  const { advisorId } = useParams();

  const navigate = useNavigate();

  const [domain, setDomain] = useState("");
  const [formData, setFormData] = useState({
    advisorId,
    topic: "",
    description: "",
    domain: "",
    weekDay: "",
    maxAttendee: "",
    slotTime: "",
    startDate: "",
    learningMaterial: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDomainChange = (e) => {
    setDomain(e.target.value);
    handleChange(e); // updates domain in formData too
  };

  const formatTopicForUrl = (topic) => {
    return topic.toLowerCase().replace(/\s+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    sendDataToapi("/batch/create", JSON.stringify(formData), "application/json")
      .then((res) => {
        toast.success("Batch Created Successfully!");
        console.log(res);
        navigate("/advisor/dashboard");
      })
      .catch((err) => {
        toast.error("Error in creating batch!");
        console.error(err);
      });
  };

  return (
    <div className="create">
      <h2>Create Batch</h2>
      <form onSubmit={handleSubmit}>
        {/* Domain Selection */}
        <select
          name="domain"
          onChange={handleDomainChange}
          defaultValue=""
          required
        >
          <option value="" disabled>
            Select Your Domain
          </option>
          <option value="mental">Mental</option>
          <option value="physical">Physical</option>
          <option value="financial">Financial</option>
        </select>

        {/* Topic Dropdown (conditional) */}
        {domain && (
          <select name="topic" onChange={handleChange} defaultValue="" required>
            <option value="" disabled>
              Select Your Topic
            </option>
            {topicsData[domain].map((topic, i) => (
              <option key={i} value={formatTopicForUrl(topic)}>
                {topic}
              </option>
            ))}
          </select>
        )}

        {/* WeekDay Dropdown */}
        <select name="weekDay" onChange={handleChange} defaultValue="">
          <option value="" disabled>
            Select Your WeekDay
          </option>
          {weekdays.map((day, i) => (
            <option key={i} value={i}>
              {day}
            </option>
          ))}
        </select>

        {/* Other Fields */}
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxAttendee"
          placeholder="Max Attendees"
          onChange={handleChange}
        />
        <input
          type="number"
          name="slotTime"
          placeholder="Slot Time (e.g. 930, 1430)"
          onChange={handleChange}
          required
        />
        <input type="date" name="startDate" onChange={handleChange} required />
        <input
          type="text"
          name="learningMaterial"
          placeholder="Learning Material Link"
          onChange={handleChange}
        />
        <button type="submit">Create Batch</button>
      </form>
    </div>
  );
};

export default CreateBatch;
