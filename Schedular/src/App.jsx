
import "./App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <>
      <div>
        <Navbar />
        <Outlet />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
