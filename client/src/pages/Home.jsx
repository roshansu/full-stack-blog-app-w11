import React from "react";
import PostCard from "../components/PostCard";
import AddPost from "../components/AddPost";
import { useState, useEffect } from "react";
import { getPostApi, postApi } from "../api/api";
import Popup from "../components/Popup";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [postData, setPostData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState({
    type: "pending",
    open: false,
    msg: "Please wait...",
  });

  const closePopup = () => {
    setPopup({
      open: false,
    });
  };

  const handleSubmit = async (formData) => {
    console.log(formData);
    setPopup({
      ...popup,
      open: true,
    });
    const data = await postApi(formData, "POST");

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


  async function fetcAllPost() {
    setLoading(true);
    const res = await getPostApi("posts");
    // console.log(res);
    setPostData(res);
    setLoading(false);
  }

  useEffect(() => {
    //  if(!localStorage.getItem('token'))
    //   return window.location.href = '/login'
    fetcAllPost();
  }, []);

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div className="pt-14 bg-gray-100">
      {localStorage.getItem("token") ? (
        <div className="m-4 ">
          <button
            onClick={() => setOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            + Add Post
          </button>

          <AddPost
            isOpen={open}
            onClose={() => setOpen(false)}
            onSubmit={handleSubmit}
          />
        </div>
      ) : (
        ""
      )}

      <div className="min-h-screen flex items-center flex-wrap gap-4 justify-center ">
        {postData.length === 0 ? (
          <div>No post is available</div>
        ) : (
          postData.map((post) => <PostCard post={post} key={post._id} />)
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

export default Home;
