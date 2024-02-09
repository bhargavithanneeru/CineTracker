import Post from "../post/Post";
import "./posts.scss";
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from "../../axios.js"
import { useEffect, useState } from "react";

const Posts = () => {
  //TEMPORARY
   const { isLoading, error, data } =  useQuery(['posts'], async () =>
    await makeRequest.get("/posts").then(res=>{
      return res.data;
    })
  )
  return( 
    <div className="posts">
      {error
        ? "Something went wrong!"
        : isLoading
        ? "loading"
        : data.map((post) => <div className="post">
          <Post post={post} key={post.id} />
          </div>
          )}
        
      
    </div>
  );
};

export default Posts;
