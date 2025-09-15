import React, { useState } from "react";
import "./ProfileCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { Useraction } from "../../store/userSlice";
import { RoleAction } from "../../store/roleSlice";
import { FaUserCircle, FaPen } from "react-icons/fa";  // <-- added FaPen
import { capitalizeWords } from "../../utils/usableFunctions";

const ProfileCard = ({ user, onEdit}) => {
  const role = useSelector((state) => state.role);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogout = () => {
    setLoading(true);
    if (role === "advisor") {
      sendDataToapi("/advisors/logout")
        .then(() => {
          toast.success("Logout Successfully!");
          dispatch(Useraction.logoutUser());
          dispatch(RoleAction.logoutRole());
          window.location.href = "/";
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
    if (role === "user") {
      sendDataToapi("/users/logout")
        .then(() => {
          toast.success("Logout Successfully!");
          dispatch(Useraction.logoutUser());
          dispatch(RoleAction.logoutRole());
          window.location.href = "/";
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  const formatDOB = (dob) => {
    if (!dob || dob.length !== 10) return dob;
    const day = dob.slice(9, 10);
    const month = dob.slice(6, 7);
    const year = dob.slice(0, 4);
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${day} ${monthNames[parseInt(month, 10) - 1]} ${year}`;
  };

  const formatArray = (arr) => {
    if (!arr || arr.length === 0) return "N/A";
    return arr.join(", ");
  };

  return (
    <div className="profile-card">
      <div className="editButton">
        <button className="edit-btn" onClick={()=>onEdit(false)}>
          <FaPen size={16} />  {/* Pen Icon */}
        </button>
      </div>

      {/* Profile Header Section */}
      <div className="profile-header">
        <div className="profile-image">
          {user?.profilepic ? (
            <img src={user.profilepic} alt="Profile" className="profile-pic" />
          ) : (
            <FaUserCircle size={80} color="#e0e0e0" />
          )}
        </div>
        <div className="profile-info">
          <h1>{capitalizeWords(user?.fullname)}</h1>
          {user?.email && <p className="username">{user.email}</p>}
        </div>
      </div>

      {/* Profile Body */}
      <div className="session-details">
        {user?.dob && (
          <div className="detail-item">
            <strong>DOB:</strong> {formatDOB(user.dob)}
          </div>
        )}

        {user?.contact?.phone && (
          <div className="detail-item">
            <strong>Phone:</strong> {user.contact.phone}
          </div>
        )}

        {user?.gender && (
          <div className="detail-item">
            <strong>Gender:</strong> {user.gender}
          </div>
        )}

        {user?.languagesSpoken && (
          <div className="detail-item">
            <strong>Languages:</strong> {formatArray(user.languagesSpoken)}
          </div>
        )}

        {user?.learningMaterial && (
          <div className="detail-item">
            <strong>Learning Material:</strong> {formatArray(user.learningMaterial)}
          </div>
        )}

        {user?.domain && (
          <div className="detail-item">
            <strong>Domain:</strong> {formatArray(user.domain)}
          </div>
        )}

        {user?.createdAt && (
          <div className="detail-item">
            <strong>Joined:</strong> {user.createdAt.slice(0, 10)}
          </div>
        )}
      </div>

      {/* Action Button */}
      <button className="logOut" onClick={handleLogout} disabled={loading}>
        {loading ? "Logging out..." : "LogOut"}
      </button>
    </div>
  );
};

export default ProfileCard;
