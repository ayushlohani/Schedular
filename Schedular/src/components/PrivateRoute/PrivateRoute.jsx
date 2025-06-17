// components/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../Firebase/Firebase";

export default function PrivateRoute() {
  const user = auth.currentUser;

  return user ? <Outlet /> : <Navigate to="/" replace />;
}
