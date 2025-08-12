import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch } from "react-redux";
import { Useraction } from "./store/userSlice";
import { useEffect, useState } from "react";
import Loader from "./components/Loader/Loader";
import { RoleAction } from "./store/roleSlice";

function App() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    fetchDataFromApi("/users/getloggedinUserAdvisor")
      .then((res) => {
        dispatch(Useraction.loginUser(res?.data?.user));
        dispatch(RoleAction.loginRole(res?.data?.role));
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
