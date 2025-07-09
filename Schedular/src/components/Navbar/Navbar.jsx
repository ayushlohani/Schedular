import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { MdOutlineAutoGraph } from "react-icons/md";
import { fetchDataFromApi, sendDataToapi } from "../../utils/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Useraction } from "../../store/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Track logged-in user
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   // Set up listener for authentication state
  //   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
  //     setUser(currentUser);
  //   });

  //   // Clean up the listener on unmount
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    fetchDataFromApi("/users/getloggedinUser")
      .then((res) => {
        setUser(res.data);
        //console.log(res);
      })
      .catch((err) => {
        setUser(null);
      });
  }, []);

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    sendDataToapi("/users/logout")
      .then((res) => {
        console.log(res);
        toast.success("Logout Successfully!");
        setUser(null);
        dispatch(Useraction.logoutUser);
        navigate("/login"); // optional
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  return (
    <div className="nav">
      <div className="left" onClick={() => navigate("/")}>
        <img src="/logo3.png" alt="Logo" />
      </div>
      <div className="right">
        <Link className="link" to={user ? "/dashboard" : "/login"}>
          Dashboard
        </Link>
        {!user && (
          <Link className="login-btn" to="/login">
            Login
          </Link>
        )}
        {user && (
          <Link className="login-btn" to="/" onClick={handleLogout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
