import React, { useState } from "react";
import { postApi } from "../api/api";
import { getToken } from "../libs/localStorage";
import Popup from "./Popup";


const PostCard = ({ post }) => {
  const token = getToken();
  const [popup, setPopup] = useState({
    type: "pending",
    open: false,
    msg: "Deleting Please wait...",
  });

  const closePopup = () => {
    setPopup({
      ...popup,
      open: false,
    });
  };

  console.log(token);
  const handleDelete = async (id) => {
    setPopup({
      ...popup,
      open: true,
    });
    const data = await postApi("", "DELETE", `/${id}`);
    if (data.success) {
      setPopup({
        ...popup,
        open: true,
        type: "success",
        msg: data.message,
      });
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
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-md w-full">
      {/* Image */}
      <img
        src={
          post.imageUrl
            ? post.imageUrl
            : "https://static.vecteezy.com/system/resources/previews/028/067/524/non_2x/post-icon-design-vector.jpg"
        }
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 space-y-2">
        {/* Author */}
        <p className="text-sm text-gray-500">
          By{" "}
          <span className="font-medium text-gray-700">{post.author?.name}</span>
        </p>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-800">{post.title}</h2>

        {/* Content */}
        <p className="text-gray-600 text-sm line-clamp-3">{post.content}</p>

        {/* Delete Button */}
        {token._id === post.author._id ? (
          <button
            onClick={() => handleDelete(post._id)}
            className="mt-3 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition">
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
      {popup.open ? (
        <Popup type={popup.type} message={popup.msg} onClose={closePopup} />
      ) : (
        ""
      )}
    </div>
  );
};

export default PostCard;
