import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import InsightsIcon from '@mui/icons-material/Insights';
import { Link,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useState } from "react";
import Button from '@mui/material/Button';

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  //Logout function
  const handleLogout = async (e) =>
  {
    e.preventDefault();
    try{
      await makeRequest.post("auth/logout")
      navigate("/login");
    }
    catch(err)
    {
      setErr(err.response.data)
    }
  }

  // Code to handle search functionality. 
  const [inputs,setInputs] = useState({
    search:"",
  });

  const handleChange = e=>{
    setInputs({[e.target.name]:e.target.value})
  }

  return (
    
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>CineTracker</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
        <div className="favoriteButton">
          <Link to="/favorites">
            <Button startIcon={<FavoriteOutlinedIcon />} />
          </Link>

          <Link to="/watchlist">
            <Button startIcon={<BookmarksIcon />} />
          </Link>

        </div>
        <div className="search">
          
          <input type="text" placeholder="Search..." name="search" onKeyUp={handleChange} />
          <Link to ="/search" state={{search:inputs.search}} >
            <Button startIcon={<SearchOutlinedIcon />}/>
          </Link>
            
            
        </div>
      </div>
      <div className="right">
      <Link to="/visualization">
            <Button startIcon={<InsightsIcon />} />
          </Link>
      <Button variant="outlined" endIcon={<LogoutIcon />} onClick={handleLogout}>
          <b>Logout</b>
      </Button>
        
        
      </div>
    </div>

  );
};

export default Navbar;
