import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserFailure,
  updateUserSuccess,
  updateUserStart,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../redux/user/userSlice.js";
import { Link } from "react-router-dom";

import { useRef, useEffect } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.user); // Get current user from Redux store
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    email: currentUser.email || "",
    username: currentUser.username || "",
    password: "", // Password should start as empty string
  });

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState(false); // For error handling
  const [showPassword, setShowPassword] = useState(false); // For password visibility toggle

  const [userListings, setUserListings] = useState([]);
  const [showListingsError, setShowListingsError] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateError(true); // Set error state if update fails
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true); // Set success state if update succeeds
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateError(true); // Set error state if there's a network error
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleDeleteUser = async (e) => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch(`/api/auth/signout`);
      const data = await res.json();
      if (data.success === false) {
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();

      console.log(data); // Check the data received from the server

      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setShowListingsError(true);
    }
  };
  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        console.log(error.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className="text-gray-600 text-3xl text-center font-semibold my-7">
        Profile
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <img
          // onClick={() => fileRef.current.click()}
          src={currentUser.avatar}
          alt="Profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          type="button"
          onClick={togglePassword}
          className="text-blue-500"
        >
          Show/Hide Password
        </button>
        <button className="bg-red-300 text-gray-600 font-semibold uppercase hover:opacity-95 disabled:opacity-80 p-3 rounded-lg">
          Update
        </button>
        <Link
          className="bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95"
          to={"/list-create"}
        >
          Create Listing
        </Link>
      </form>
      {/* 
      {updateSuccess && (
        <p className="text-green-500 text-center mt-4">
          Profile updated successfully!
        </p>
      )} */}

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-500 cursor-pointer"
        >
          Delete Account
        </span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer">
          Sign Out
        </span>
      </div>

      {updateSuccess && (
        <p className="text-red-400 text-center mt-4">
          Profile updated successfully!
        </p>
      )}

      {updateError && (
        <p className="text-red-500 text-center mt-4">
          Failed to update profile. Please try again.
        </p>
      )}
      <button onClick={handleShowListings} className="text-red-400  w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className="text-red-700 uppercase"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
