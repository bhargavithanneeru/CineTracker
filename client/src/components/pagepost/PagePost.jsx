import "./pagepost.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState } from "react";
import Button from '@mui/material/Button';
import { makeRequest } from "../../axios";

const PagePost = ({post}) => {

  //TEMPORARY
  const [err, setErr] = useState(null);
  const [clicked, setClicked] = useState(false)
  const [watch, setWatch] = useState(false)
  
  //Function to add and remove favorites.
  


  return (
    <div className="post">
      <div className="container">
        <div className="content">
          <div className="title">
            <b><p>Title : {post.title}</p></b>
          </div>
          <img src={post.poster} alt="" />
          <p>{post.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default PagePost;
