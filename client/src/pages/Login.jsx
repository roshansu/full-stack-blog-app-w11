import React from "react";
import { useState } from "react";
import userAuthApi from "../api/api";
import { Link } from "react-router-dom";
import setUserLC from "../libs/localStorage";
import Popup from "../components/Popup";

const Login = () => {
  const api = import.meta.env.VITE_API;

  if (!!localStorage.getItem("token")) {
    window.location.href = "/";
  }

  const [popup, setPopup] = useState({
    type: "pending",
    open: false,
    msg: "Please wait...",
  });

  const closePopup = () => {
    setPopup({
      type: "pending",
      open: false,
      msg: "Deleting Please wait..."
    });
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  //   const [popup, setPopup] = useState(null);

  const handleChange = async (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setPopup({
      ...popup,
      open: true,
    });

    const data = await userAuthApi("login", formData);

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
  };

  return (
    <div className="min-h-screen mt-14 flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>

        {/* Optional: Signup redirect */}
        <Link to={"/signup"}>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span className="text-blue-500 cursor-pointer hover:underline">
              Sign up
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

export default Login;
