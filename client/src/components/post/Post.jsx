import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { useState } from "react";
import Button from '@mui/material/Button';
import { makeRequest } from "../../axios";
import StarIcon from '@mui/icons-material/Star';

const Post = ({post}) => {

  //TEMPORARY
  const [err, setErr] = useState(null);
  const [clicked, setClicked] = useState(false)
  const [watch, setWatch] = useState(false)
  
  //Function to add and remove favorites.
  const addfav = async (e)=>
  {
    e.preventDefault();
    if(!clicked)
    {
      try
      {
        await makeRequest.post("/favorites",{id:post.id})          
        setClicked(true);
      }
      catch(err)
      {
        setErr(err.response); 
      }
    }
    else
    {
      try 
      {
        await makeRequest.post("/favorites/delete",{id:post.id})
        setClicked(false);
      }
      catch(err)
      {
        setErr(err.response); 
      }
    }
    
  }; 

  const addWatchlist = async (e)=>
  {
    e.preventDefault();
    if(!watch)
    {
      try
      {
        await makeRequest.post("/watchlist",{id:post.id})          
        setWatch(true);
      }
      catch(err)
      {
        setErr(err.response); 
      }
    }
    else
    {
      try 
      {
        await makeRequest.post("/watchlist/delete",{id:post.id})
        setWatch(false);
      }
      catch(err)
      {
        setErr(err.response); 
      }
    }
    
  }; 


  return (
    <div className="post">
      <div className="container">
        <div className="content">
          <div className="title">
            <b><p style={{overflow: "hidden"}} >Movie Name : {post.title}</p></b>

          </div>
          <img src={post.poster} alt="" />
          <p>{post.overview}</p>
        </div>
        <div className="info">
          <Button >
            {clicked ? <FavoriteOutlinedIcon onClick={addfav}/> : 
              <FavoriteBorderOutlinedIcon onClick={addfav}/>}
          </Button>
          <Button >
            {watch ? <BookmarkAddedIcon onClick={addWatchlist}/> : 
              <BookmarkBorderIcon onClick={addWatchlist}/>}
          </Button>
          <div className="rating">
            <p>Rating : <b>{post.rating} <StarIcon style={{ color: 'yellow' }}/></b></p>
          </div>  
        

          
        </div>
      </div>
    </div>
  );
};

export default Post;
