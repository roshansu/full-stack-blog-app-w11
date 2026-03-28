import React from "react";

const UserProfileCard = ({ user}) => {
  if(!localStorage.getItem('token')){
    return window.location.href = '/'
  }
return (
<div className="max-w-4xl mx-auto p-4">
  
  {/* Profile Card */}
  <div className="bg-white shadow-md rounded-2xl p-6 flex items-center justify-between">
    
    {/* Left Side (Avatar + Info) */}
    <div className="flex items-center gap-4">
      {/* Avatar */}
      <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl font-bold">
        {user.name.charAt(0).toUpperCase()}
      </div>

      {/* User Info */}
      <div>
        <h2 className="text-xl font-bold text-gray-800">
          {user.name}
        </h2>
        <p className="text-gray-500">{user.email}</p>
      </div>
    </div>

    {/* Logout Button */}
    <button
      onClick={() => {
        localStorage.removeItem("token");
        window.location.reload(); // or navigate("/login")
      }}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>
    
  </div>
</div>
  );
};

export default UserProfileCard;