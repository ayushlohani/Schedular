import React, { useState, useEffect } from "react";
import "./Login.scss";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../components/Firebase/Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navigate,Link} from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with", { email, password });

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("Logged in user:", user);
      toast.success("Login Successful!", {
        position: "top-center",
      });
      window.location.href = "/Category";
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };
  const GotoRegister=()=>{
    Navigate("/Signin");
  };
  return (
    <>
    <div className="home-scroll-container">
      <div className="left">
        <div className="auth-container">
          <h2>Login</h2>
            <div className="login-form">
              <form
                onSubmit={handleLogin}
                className="auth-form"
                autoComplete="off"
              >
                <div>
                  <label className="mail">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    autoComplete="off"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="pass">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    autoComplete="new-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit">Login</button>
              </form>
            </div>
            <div className="switch-text">
              <>
                Don't have an account?{" "}
                <Link to='/Signin'>Register</Link>
              </>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
    </>
  );
}
