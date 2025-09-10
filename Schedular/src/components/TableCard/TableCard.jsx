import React, { useState } from "react";
import "./TableCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { Useraction } from "../../store/userSlice";
import { RoleAction } from "../../store/roleSlice";
import { FaUserCircle } from "react-icons/fa";

const TableCard = ({ user }) => {
  const role = useSelector((state) => state.role);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="profile-card">
      <div className="profile-header">
        {user?.advisorId?.profilepic? (
          <img src={user?.advisorId?.profilepic} alt="Profile" className="profile-pic-lg" />
        ) : (
          <FaUserCircle size={64} />
        )}
        <h2>{user?.advisorId?.fullname}</h2>
        <p className="muted">{user?.advisorId?.domain}</p>
      </div>

      <div className="profile-body">
        <p>
          <strong>status:</strong> {user?.status}
        </p>
        <p>
          <strong>Topic:</strong> {user?.topic || "N/A"}
        </p>
        <p>
          <strong>Details:</strong> {user?.details || "N/A"}
        </p>
        <button style={{marginTop: "10px"}} onClick={()=> window.open(user?.meetlink || "/", "_blank")}>
          <strong>Join</strong>
        </button>
      </div>
    </div>
  );
};

export default TableCard;
