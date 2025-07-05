import { useEffect, useState } from "react";
import { auth } from "../../components/Firebase/Firebase";
import { onAuthStateChanged } from "firebase/auth";
import Category from "../Category/Category";
import LandingPage from "../LandingPage/LandingPage";
import DashBoard from "../DashBoard/DashBoard";

const Home = () => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsubscribe();
  }, []);

  if (user === undefined) return <p>Loading...</p>;

  return user ? <DashBoard /> : <LandingPage />;
};

export default Home;
