import React, { useState } from "react";
import "./ProfileCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { Useraction } from "../../store/userSlice";
import { RoleAction } from "../../store/roleSlice";
import { FaUserCircle } from "react-icons/fa";

const ProfileCard = ({ user }) => {
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

  return (
    <div className="profile-card">
      <div className="profile-header">
        {user?.profilepic ? (
          <img src={user.profilepic} alt="Profile" className="profile-pic-lg" />
        ) : (
          <FaUserCircle size={64} />
        )}
        <h2>{user?.fullname}</h2>
        <p className="muted">{user?.email}</p>
      </div>

      <div className="profile-body">
        <p>
          <strong>Role:</strong> {role}
        </p>
        <p>
          <strong>Phone:</strong> {user?.contact?.phone || "N/A"}
        </p>
        <p>
          <strong>Gender:</strong> {user?.gender || "N/A"}
        </p>
        <p>
          <strong>Language Spoken:</strong> {user?.languagesSpoken || "N/A"}
        </p>
        <p>
          <strong>Joined:</strong> {user?.createdAt?.slice(0, 10) || "N/A"}
        </p>
        <button className="logOut" onClick={handleLogout} disabled={loading}>
          {loading ? "Logging out..." : "LogOut"}
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
