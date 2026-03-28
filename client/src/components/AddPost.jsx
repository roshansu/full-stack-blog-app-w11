import { useState } from "react";
import React from "react";
import { getToken } from "../libs/localStorage";

const AddPost = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  

  const [image, setImage] = useState(null);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("image", image);


    onSubmit(data);

    // reset
    setFormData({ title: "", content: "" });
    setImage(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create Post</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Enter title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />

          {/* Content */}
          <textarea
            name="content"
            placeholder="Write your content..."
            value={formData.content}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-lg"
          />

          {/* Image */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full"
          />

          {/* Buttons */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPost;