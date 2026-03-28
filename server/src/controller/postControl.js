import Post from "../models/post.js";
import cloudinary from "../utils/cloudinary.js";
import streamifier from "streamifier";

export const getAllPost = async (req, res) => {
  try {
    const data = await Post.find().populate("author", "name");
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send("something went wrong");
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params || {};
    const userId = req.result._id;
    if (!id) {
      res.send("Missing post id");
      return;
    }

    const data = await Post.findById(id).populate("author");
    if (!data) {
      res.send({message: "Post does not exist", success: false});

      return;
    }
    console.log(data.author._id, userId);
    if (!data.author._id.equals(userId)) {
      res.send({message: "access denied", success: false});
      return;
    }

    await Post.deleteOne({ _id: id });
      res.send({message: "Post deleted", success: true});

  } catch (err) {
    console.log(err);
        res.send({message: "Error while deleting post", success: false});

  }
};

export const newPost = async (req, res) => {
  try {
    const { title, content } = req.body || {};
    const userData = req.result;
    console.log(userData, title, content);

    if (!title && !content) {
      res.send("Missing content or title");
      return;
    }

    let imageUrl = "";
    console.log(req.file);
    if (req.file) {
      const streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "profile-pictures" },
            (error, result) => {
              if (result) {
                resolve(result);
              } else {
                reject(error);
              }
            },
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      const uploadResult = await streamUpload(req);
      imageUrl = uploadResult.secure_url;
      console.log(imageUrl);
      req.body.imageUrl = imageUrl;
    }

    req.body.author = userData._id;
    const postData = await Post.create(req.body);
    res.send({message: "Post added", success: true, postData});
  } catch (err) {
    console.log(err);
    res.send({message: "Error while adding post", success: false});

  }
};

export const recentPost = async (req, res) => {
  try {
    const posts = await Post.aggregate([
      { $sort: { createdAt: -1 } },
      { $limit: 3 },
    ]);

    res.send(posts);
  } catch (err) {
    console.log(err);
    res.send("Something went wrong");
  }
};
