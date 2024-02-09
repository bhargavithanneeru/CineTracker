import PagePost from "../pagepost/PagePost";
import "./favorites.scss";
import Navbar from "../navbar/Navbar";
import { makeRequest } from "../../axios.js"
import {Outlet, Navigate } from 'react-router-dom';
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";

import "../posts/posts.scss"
import "../../pages/home/home.scss"
import { useEffect, useState } from "react";


const Favorites = () => {
  //TEMPORARY
  const {currentUser} = useContext(AuthContext);
  const { darkMode } = useContext(DarkModeContext);
  
  const [posts,setPost]=useState([]);
  const [err,setError] = useState(null);

  const GetFavorites = async () =>
  {
    try{
      const response = await makeRequest.get("/favorites"); 
      const data = await response.data;
      setPost(data);
    }
    catch(err)
    {
      setError(err);
    }
    
  };
  useEffect(() => {
    GetFavorites()
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
          {posts.map((post) => <PagePost post={post} key={post.id} />)}
      </div>
      </div>
    </div>
    
  );
};

export default Favorites;
