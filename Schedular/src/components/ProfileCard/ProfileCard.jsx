import React, { useState } from "react";
import "./ProfileCard.scss";
import { useDispatch, useSelector } from "react-redux";
import { sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { Useraction } from "../../store/userSlice";
import { RoleAction } from "../../store/roleSlice";

const ProfileCard = () => {
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
    <div className="profile">
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
