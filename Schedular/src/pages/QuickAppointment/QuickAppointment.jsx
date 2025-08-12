import React, { useEffect, useState } from "react";
import "./QuickAppointment.scss";
import {
  deleteDataFromApi,
  fetchDataFromApi,
  sendDataToapi,
} from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const QuickAppointment = () => {
  const { category, topic } = useParams();
  const [quickAppointment, setQuick] = useState();
  const [status, setStatus] = useState("pending");
  const [linkOpened, setLinkOpened] = useState(false);
  const user = useSelector((state) => state.user);
  const [meetLink, setMeetLink] = useState("#");
  const navigate = useNavigate();

  const handleQuick = () => {
    sendDataToapi(
      `/appointment/createQuickAppointment`,
      JSON.stringify({ userId: user?._id, domain: category, topic }),
      "application/json"
    )
      .then((res) => {
        setQuick(res?.data?.data);
        console.warn(res);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    if (!quickAppointment?._id) return;
    deleteDataFromApi(
      `/appointment/cancelQuickAppointment/${quickAppointment._id}`
    )
      .then(() => {
        toast.success("Your Quick Appointment is Cancelled");
        navigate("/category");
      })
      .catch(() => toast.error("Error Occured in Canceling"));
  };

  const getStatus = () => {
    if (!quickAppointment?._id) return;
    fetchDataFromApi(`/appointment/getappointmentbyid/${quickAppointment._id}`)
      .then((res) => {
        if (res.data.status === "confirmed") {
          setStatus("confirmed");
          setMeetLink(res.data.meetlink);
          if (!linkOpened) {
            window.open(res.data.meetlink, "_blank", "noopener,noreferrer");
            setLinkOpened(true);
          }
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!quickAppointment?._id) return;
    const interval = setInterval(() => {
      getStatus();
    }, 3000);
    return () => clearInterval(interval);
  }, [quickAppointment]);

  return status === "pending" ? (
    <div className="quick-appointment">
      <h2>Finding the Right Advisor for You...</h2>
      <p>Please wait while we search for a quick match based on your needs.</p>

      <div className="loading-animation">
        <div className="dot dot1" />
        <div className="dot dot2" />
        <div className="dot dot3" />
      </div>

      <p className="tip">
        Tip: Ensure your profile is complete for faster matches!
      </p>
      <button onClick={handleQuick}>Generate Request</button>
      <button onClick={handleCancel}>Cancel Quick Appointment</button>
    </div>
  ) : (
    <div className="quick-appointment">
      <h2>You Have Got the Appointment. Your Meet Link is:</h2>
      <a
        href={meetLink}
        target="_blank"
        rel="noopener noreferrer"
        className="meet-link"
      >
        Join Meeting
      </a>
    </div>
  );
};

export default QuickAppointment;
