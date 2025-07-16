import { useEffect, useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import DashBoard from "../DashBoard/DashBoard";
import { fetchDataFromApi } from "../../utils/api";
import Loader from "../../components/Loader/Loader";
import Category from "../Category/Category";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [user, setUser] = useState(undefined);
  //   useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (u) => {
  //     setUser(u);
  //   });
  //   return () => unsubscribe();
  // }, []);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataFromApi("/users/getloggedinUser")
      .then((res) => {
        setUser(res.data);
        console.log(res);
        navigate("/category");
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, []);

  if (user === undefined) return <Loader />;

  return user ? <Category /> : <LandingPage />;
};

export default Home;
