import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, showActions = true }) => {
  const dispatch = useDispatch();
  if (!user) return null;
  const { _id, firstName, lastName, photoURL, about, age, gender } = user;

  const handleSentRequest = async (status, userId) => {
    const res = await axios.post(
      API_BASE_URL + "/request/send/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );

    dispatch(removeUserFromFeed(userId));
  };

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={photoURL} alt="User" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          {age && gender && (
            <p className="text-sm text-gray-400">
              {age}, {gender}
            </p>
          )}
          <p>{about}</p>
          {showActions && (
            <div className="card-actions justify-center my-4">
              <button
                className="btn btn-primary"
                onClick={() => handleSentRequest("ignored", _id)}
              >
                Ignore
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => handleSentRequest("interested", _id)}
              >
                Interested
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserCard;
