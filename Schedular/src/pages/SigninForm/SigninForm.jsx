import React, { useState } from "react";
import axios from "axios";
import Loader from "../../components/Loader/Loader"
import "./SigninForm.scss";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    contact: "",
    address: "",
    emergencyContact: "",
    bloodGroup: "",
    languagesSpoken: "",
    profilepic: null,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const data = new FormData();
      for (const key in formData) {
        data.append(key, formData[key]);
      }

      const res = await axios.post("/users/registerUser", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
        {loading && <Loader />}
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>User Registration</h2>
        {msg && <p className="message">{msg}</p>}

        <input type="text" name="fullname" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="date" name="dob" onChange={handleChange} />
        <input type="text" name="gender" placeholder="Gender" onChange={handleChange} />
        <input type="text" name="contact" placeholder="Contact" onChange={handleChange} />
        <input type="text" name="address" placeholder="Address" onChange={handleChange} />
        <input type="text" name="emergencyContact" placeholder="Emergency Contact" onChange={handleChange} />
        <input type="text" name="bloodGroup" placeholder="Blood Group" onChange={handleChange} />
        <input type="text" name="languagesSpoken" placeholder="Languages Spoken" onChange={handleChange} />
        <input type="file" name="profilepic" onChange={handleChange} accept="image/*" />

        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
