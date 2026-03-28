import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <nav className="w-full bg-white shadow-md px-6 py-3 fixed top-0 flex justify-between items-center">
      {/* Logo */}

      <Link to={'/'}>
      <h1 className="text-xl font-bold text-blue-600 cursor-pointer">
        BlogApp
      </h1>
      </Link>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {!isLoggedIn ? (
          <>
            <Link to={'/signup'} className="px-4 py-1 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50 transition">
              Signup
            </Link>
            <Link to={'/login'} className="px-4 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition">
              Login
            </Link>
          </>
        ) : (
          <div className="flex items-center gap-3">
            {/* Profile Icon */}
            <Link to={'/profile'}>
            <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold cursor-pointer">
              R
            </div>
            </Link>

            {/* Logout */}
            {/* <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:underline"
            >
              Logout
            </button> */}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;