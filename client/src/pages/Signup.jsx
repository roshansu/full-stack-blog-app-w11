import { useState } from "react";
import React from "react";
import Popup from "../components/Popup";
import userAuthApi from "../api/api";
import { Link } from "react-router-dom";
import setUserLC from "../libs/localStorage";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!!localStorage.getItem("token")) {
    window.location.href = "/";
  }
  const [popup, setPopup] = useState({
    type: "pending",
    open: false,
    msg: "Please wait...",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closePopup = () => {
    setPopup({
      type: "pending",
      open: false,
      msg: "Deleting Please wait..."
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("wrong password");
      return;
    }

    setPopup({
      ...popup,
      open: true,
    });

    const data = await userAuthApi("register", formData);

    if (data.success) {
      console.log("setting token");
      setPopup({
        ...popup,
        open: true,
        type: "success",
        msg: data.message,
      });
      setUserLC(data);
    } else {
      setPopup({
        ...popup,
        open: true,
        type: "error",
        msg: data.message,
      });
    }

    // console.log(formData);
    // alert("Signup successful!");
  };

  return (
    <div className="min-h-screen mt-14 flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Sign Up
          </button>
        </form>

        <Link to={"/login"}>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              Login
            </span>
          </p>
        </Link>
      </div>

      {popup.open ? (
        <Popup type={popup.type} message={popup.msg} onClose={closePopup} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Signup;
