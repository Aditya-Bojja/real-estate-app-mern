import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../redux/user/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [profileData, setProfileData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());
    setUpdateSuccess(false);
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4">
        {/* Implement edit profile picture functionality */}
        {/* <div className="flex items-center justify-center">
          <img
            src={currentUser.avatar}
            alt="profile"
            className="object-cover w-24 h-24 rounded-full cursor-pointer"
          />
          <FaEdit
            className="self-end cursor-pointer text-slate-700"
            title="Edit profile picture"
          />
        </div> */}
        <img
          src={currentUser.avatar}
          alt="profile"
          className="self-center object-cover w-24 h-24 mt-2 rounded-full cursor-pointer"
        />
        <input
          type="text"
          placeholder="username"
          id="username"
          className="p-3 border rounded-lg"
          defaultValue={currentUser.username}
          onChange={handleProfileChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          className="p-3 border rounded-lg"
          defaultValue={currentUser.email}
          onChange={handleProfileChange}
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          className="p-3 border rounded-lg"
          onChange={handleProfileChange}
        />
        <button
          disabled={loading}
          className="p-3 text-white uppercase rounded-lg bg-slate-700 hover:opacity-90 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer">Sign out</span>
      </div>
      <div className="mt-3 text-red-600">{error ? error : ""}</div>
      <div className="mt-3 text-green-600">
        {updateSuccess ? "Profile updated successfully" : ""}
      </div>
    </div>
  );
}

export default Profile;
