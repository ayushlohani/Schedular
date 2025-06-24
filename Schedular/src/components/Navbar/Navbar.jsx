import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { Link } from "react-router-dom";
import { MdOutlineAutoGraph } from "react-icons/md";

const Navbar = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Track logged-in user

  useEffect(() => {
    // Set up listener for authentication state
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="nav">
      <div className="left" onClick={() => navigate("/")}>
        <img src="/logo3.png" alt="Logo" />
      </div>
      <div className="right">
        <Link className="link" to="/dashboard">
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
