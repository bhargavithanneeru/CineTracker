import Post from "../post/Post";
import "./search.scss";
import Navbar from "../navbar/Navbar";
import { makeRequest } from "../../axios.js"
import {Outlet, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { useLocation } from 'react-router-dom'

import "../posts/posts.scss"
import "../../pages/home/home.scss"
import { useEffect, useState } from "react";


const Search = () => {
  //Retrieving information from home page 
  const location = useLocation()
  const [info,setSearch] = useState(location.state);
  //TEMPORARY
  const {currentUser} = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  
  const [posts,setPost]=useState([]);
  const [err,setError] = useState(null);
  
  const GetSearch = async () =>
  {
    
    try{
      const response = await makeRequest.post("/search", {input:info.search}); 
      const data = await response.data;
      setPost(data);
    }
    catch(err)
    {
      setError(err);
    }
  };
  useEffect(() => {
    GetSearch()
    },[]);
  
  return( 
    
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div style={{ display: "flex" }}>
          <div style={{ flex: 6 }}>
            <Outlet />
          </div>
          
        </div>
        <div className="home">
        <div className="posts">
          {posts.map((post) => <Post post={post} key={post.id} />)}
      </div>
      </div>
    </div>
    
  );
};

export default Search;
