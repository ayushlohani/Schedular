import { useEffect, useState } from "react";
import LandingPage from "../LandingPage/LandingPage";
import DashBoard from "../DashBoard/DashBoard";
import { fetchDataFromApi } from "../../utils/api";

const Home = () => {
  const [user, setUser] = useState(undefined);
  //   useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (u) => {
  //     setUser(u);
  //   });
  //   return () => unsubscribe();
  // }, []);

  useEffect(() => {
    fetchDataFromApi("/users/getloggedinUser")
      .then((res) => {
        setUser(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.error("Error fetching user:", err);
        setUser(null);
      });
  }, []);

  if (user === undefined) return <p>Loading...</p>;

  return user ? <DashBoard /> : <LandingPage />;
};

export default Home;
