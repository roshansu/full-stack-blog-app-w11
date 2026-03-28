import React from 'react'
import UserProfileCard from '../components/UserProfileCard';
import { useEffect, useState } from 'react';
import { getToken } from '../libs/localStorage';
import { getPostApi } from '../api/api';
import PostCard from '../components/PostCard';

const UserProfile = () => {
 const [postData, setPostData] = useState([])
 const [loading, setLoading] = useState(true)

 const user = getToken()
   async function fetcAllPost() {
     setLoading(true)
     const res = await getPostApi("user")
     console.log(res)
     setPostData(res)
     setLoading(false)
   }
 
   useEffect(()=>{
      if(!localStorage.getItem('token'))
       return window.location.href = '/'
     fetcAllPost()
   }, [])

  return (
    <div className="min-h-screen mt-14 bg-gray-100 p-4">
      <UserProfileCard user={user} />

    <div className="min-h-screen flex items-center flex-wrap gap-4 justify-center ">
      {
        loading?<div>Loading post</div>:(postData.length === 0?<div>No post is available</div>
        : postData.map((post)=>(
          <PostCard post={post} key={post._id} />
        )))
      }
    </div>
    </div>
  )
}

export default UserProfile
