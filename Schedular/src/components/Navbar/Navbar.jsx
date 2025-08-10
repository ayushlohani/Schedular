import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdOutlineArrowBack } from "react-icons/md"; // Back arrow icon
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Useraction } from "../../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi("/advisors/getloggedinAdvisor")
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    sendDataToapi("advisors/logout")
      .then(() => {
        toast.success("Logout Successfully!");
        setUser(null);
        dispatch(Useraction.logoutUser);
        navigate("/");
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="nav">
      {/* Back Button */}
      <div className="back-btn" onClick={() => navigate(-1)}>
        <MdOutlineArrowBack size={24} />
      </div>

      {/* Logo */}
      <div className="left" onClick={() => navigate("/")}>
        <img src="/logo3.png" alt="Logo" />
      </div>

      {/* Links */}
      <div className="right">
        <span className="link" onClick={() => navigate(user ? "/dashboard" : "/login")}>
          Dashboard
        </span>
        {!user && (
          <span className="login-btn" onClick={() => navigate("/loginConditon")}>
            Login
          </span>
        )}
        {user && (
          <span className="login-btn" onClick={handleLogout}>
            Logout
          </span>
        )}
      </div>
    </div>
  );
};

export default Navbar;
