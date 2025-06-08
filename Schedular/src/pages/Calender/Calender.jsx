import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "./Calender.scss";
import BookingForm from "../../components/Bookingform/Bookingform";
import Slot from "../../components/Slot/Slot";
import { useParams } from "react-router-dom";
import doctorList from "../../data/DoctorData";
import { env } from "../../data/secretData";

const CLIENT_ID = `${env.CLIENT_SECRET}`;
const API_KEY = `${env.API_KEY}`;
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

const Calender = () => {
  const [valueDate, setvalueDate] = useState(null);
  const [isSlot, setISlot] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [gapiReady, setGapiReady] = useState(false);
  const [tokenClient, setTokenClient] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [eventId, setEventId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loggedInUserEmail, setloggedInUserEmail] = useState(null);

  const { id } = useParams();
  const doc = doctorList.find((d) => d.id === id);

  const startTime = doc?.slotStarttime || "08:00";
  const endTime = doc?.slotEndTime || "18:00";

  useEffect(() => {
    const initializeGapi = () => {
      window.gapi.load("client", async () => {
        await window.gapi.client.init({
          apiKey: API_KEY,
          discoveryDocs: [
            "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
          ],
        });
        setGapiReady(true);
      });
    };

    const initializeTokenClient = () => {
      const client = window.google.accounts.oauth2.initTokenClient({
        client_id: CLIENT_ID,
        scope: SCOPES,
        callback: (tokenResponse) => {
          if (tokenResponse?.access_token) {
            setAccessToken(tokenResponse.access_token);
            window.gapi.client.load("oauth2", "v2", () => {
              window.gapi.client.oauth2.userinfo.get().then((resp) => {
                if (resp.result?.email) {
                  setloggedInUserEmail(resp.result.email);
                }
              });
            });
          }
        },
      });
      setTokenClient(client);
    };

    if (window.gapi && window.google) {
      initializeGapi();
      initializeTokenClient();
    }
  }, []);

  const signIn = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    } else {
      alert("Google Token Client not initialized.");
    }
  };

  const disablePastDates = ({ date, view }) => {
    if (view === "month") {
      return date < new Date().setHours(0, 0, 0, 0);
    }
    return false;
  };

  const isFormOpen = (slotTime) => {
    if (!accessToken) {
      alert("Please sign in to book a slot.");
      return;
    }
    setSelectedSlot(slotTime);
    setIsForm(true);
  };

  const onClickDate = (date) => {
    setvalueDate(date); // global use
    handleSlotOpen(date); // pass it where needed
  };

  //This function help in Key for Booked Slots
  const changeDatetoString = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}${month}${year}`;
  };

  const handleSlotOpen = (date) => {
    setISlot(true);
    console.log("Using latest date:", changeDatetoString(date)); // use immediately here
  };

  const onSubmit = async (formObj) => {
    const [start, end] = selectedSlot.split("–");
    const date = valueDate.toLocaleDateString("en-CA");

    const userEmail = loggedInUserEmail || formObj.email;

    const event = {
      summary: `Appointment with Dr. ${doc.name}`,
      location: "Online",
      description: `Booking with ${doc.name}.\nTime: ${start}–${end} IST`,
      start: {
        dateTime: `${date}T${start}:00`,
        timeZone: "Asia/Kolkata",
      },
      end: {
        dateTime: `${date}T${end}:00`,
        timeZone: "Asia/Kolkata",
      },
      attendees: [{ email: userEmail }, { email: doc?.email }],
      reminders: { useDefault: true },
    };

    try {
      const res = await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event,
        sendUpdates: "all",
      });
      setEventId(res.result.id);
      alert("Event created successfully.");
    } catch (err) {
      console.error("Error creating event:", err);
      alert("Failed to create event.");
    }
  };

  return (
    <div className="calender">
      <div className="left">
        <Calendar onClickDay={onClickDate} tileDisabled={disablePastDates} />
        {isSlot && (
          <Slot
            onSlotClick={isFormOpen}
            slotTimeStart={startTime}
            slotTimeEnd={endTime}
            dateSelected={changeDatetoString(valueDate)}
            userId={id}
            bookedSlots={doc?.bookedSlots}
          />
        )}
      </div>

      <div className="right">
        {!accessToken && gapiReady && (
          <>
            <div className="gray"></div>
            <div className="signIn">
              <h3>Please LogIn First</h3>
              <button onClick={signIn}>Log In</button>
            </div>
          </>
        )}
        {isForm && <BookingForm onSubmit={onSubmit} />}
      </div>
    </div>
  );
};

export default Calender;
