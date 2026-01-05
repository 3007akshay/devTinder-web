import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import UserCard from "./UserCard";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res?.data?.data);
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.lenght === 0)
    return <h1 className="text-bold text-2xl">No Connections Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connections.map((connection) => {
        const { _id, firstName, lastName, age, gender, about, photoURL } =
          connection;
        return (
          <div key={_id} className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div><img src={photoURL} alt="" className="w-16 h-16 rounded-full"/></div>
            <div className="text-left mx-4"><h2 className="font-bold text-xl">{firstName + " " + lastName}</h2>
            {age && gender &&<p>{age + " ," + gender}</p>}
            <p>{about}</p>
            </div>
            
            
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
