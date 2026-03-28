# 📝 Fullstack Blog App (MERN Stack)

## 🚀 Project Overview

This project is a **Fullstack Blog Application** built using the **MERN Stack (MongoDB, Express, React, Node.js)**. It connects a React frontend with a Node.js backend and MongoDB database, implementing full CRUD operations, authentication, and image uploads.

---

## 🎯 Project Objective

To integrate frontend and backend systems into a fully functional web application where users can:

- Create, read, and delete blog posts
- Upload images for posts
- Authenticate using JWT
- View posts created by specific users

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API / Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)

### Authentication
- JWT (JSON Web Token)
- bcrypt (password hashing)

### File Upload
- Multer (file handling)
- Cloudinary (cloud image storage)

---

## ✨ Features

### ✅ Level 1 (Basic)
- Connect React frontend with Node.js backend
- Fetch blog posts from MongoDB
- Display posts dynamically
- Handle CORS using `cors` middleware

---

### ✅ Level 2 (Intermediate)
- Full CRUD functionality:
  - Create post
  - Fetch posts
  - Delete post
- React form for creating posts
- Delete button for removing posts
- Loading and error states in UI

---

### ✅ Level 3 (Advanced)

#### 📸 Image Upload
- Upload image using Multer
- Store images on Cloudinary
- Save image URL in MongoDB

#### 🔐 Authentication (JWT)
- User Signup
- User Login
- Password hashing using bcrypt
- Protected routes using JWT middleware

#### 👤 User Features
- Each post linked to a user (author)
- Users can:
  - View their own posts
  - Delete only their posts

---

## 📂 Folder Structure
