import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constant";
import axios from "axios";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        API_BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(API_BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;

  if (request.lenght === 0)
    return <h1 className="text-bold text-2xl">No Requests Found</h1>;
  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Requests</h1>

      {request.map((request) => {
        const { firstName, lastName, age, gender, about, photoURL } =
          request.fromUserId;
        return (
          <div
            key={request._id}
            className="flex items-center justify-between m-4 p-6 rounded-lg bg-base-300 w-2/3 mx-auto shadow-lg"
          >
            {/* Profile Image */}
            <div className="shrink-0">
              <img
                src={photoURL}
                alt={firstName}
                className="w-20 h-20 rounded-full object-cover border-2 border-base-100"
              />
            </div>

            {/* User Info */}
            <div className="flex-1 text-left mx-6">
              <h2 className="font-bold text-xl text-white mb-1">
                {firstName + " " + lastName}
              </h2>
              {age && gender && (
                <p className="text-sm text-gray-400 mb-2">
                  {age}, {gender}
                </p>
              )}
              <p className="text-sm text-gray-300 line-clamp-2">{about}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                className="btn btn-primary "
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
