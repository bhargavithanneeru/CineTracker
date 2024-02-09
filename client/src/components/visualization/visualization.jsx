import { useState } from "react";
import { ratingsData,budgetData,dateData } from "../../Utils/Data";
import "../../style.scss";
import BarChart from "../BarChart.js";
import { DarkModeContext } from "../../context/darkModeContext";
import Navbar from "../navbar/Navbar";
import { useContext } from "react";
import ShowChartIcon from '@mui/icons-material/ShowChart';
import Button from '@mui/material/Button';
import { useEffect } from "react";



function Visualization() {
  const { darkMode } = useContext(DarkModeContext);
  
  const [userData, setUserData] = useState({
    labels: ratingsData.map((data) => data.ratingsrange),
    datasets: [
      {
        label: "No of movies in this range",
        data: ratingsData.map((data) => data.count),
        barPercentage: 0.8,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  const [userData1, setUserData1] = useState({
    labels: budgetData.map((data) => data.budgetrange),
    datasets: [
      {
        label: "No of movies in this range",
        data: budgetData.map((data) => data.count),
        barPercentage: 0.8,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  const [userData2, setUserData2] = useState({
    labels: dateData.map((data) => data.daterange),
    datasets: [
      {
        label: "No of movies in this range",
        data: dateData.map((data) => data.count),
        barPercentage: 0.8,
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
      },
    ],
  });

  const [viz, setViz] = useState(null);
  

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar />
        <div className="home" >
            
            
            <Button onClick={()=>setViz('budget')} variant="outlined" endIcon={<ShowChartIcon />}  >
                <b>Budget vs Movies</b> 
            </Button>
            
            <Button onClick={()=>setViz('release')} variant="outlined" endIcon={<ShowChartIcon />} >
                <b>Movies vs Release Date</b> 
            </Button>
            
            <Button onClick={()=>setViz('ratings')} variant="outlined" endIcon={<ShowChartIcon />} >
                <b>Movies vs Ratings Range</b> 
            </Button>
           
            
        </div>
          <br></br>
        <div className="visulisations">
        <div class="margin-top-50">
         {(viz=='budget') ? <BarChart chartData={userData1} /> : null}
         {(viz=='release') ? <BarChart chartData={userData2} /> : null}
         {(viz=='ratings') ? <BarChart chartData={userData} /> : null}
          
            
        </div>
        </div>
    </div>
  );
}

export default Visualization;
