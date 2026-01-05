import { Outlet, useSearchParams } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData){
      return;
    }
    try {
      const res = await axios.get(API_BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.log(err);
    }
  };

  useEffect(() => {
    
      fetchUser();
    
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
