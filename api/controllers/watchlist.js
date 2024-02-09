import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const AddWatchlist = (req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO watchlist(userid,movieid) VALUES (?)";
    const values = [
      userInfo.id, 
      req.body.id
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Watchlist has been created.");
    });
  });
};

export const DeleteWatchlist = (req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM watchlist WHERE userid = ? AND movieid = ?";


    db.query(q, [userInfo.id, req.body.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Watchlist has been deleted.");
    });
  });
};

export const GetWatchlist = (req,res) =>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM movies where id in (SELECT movieid from watchlist where userid=?);";


        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            
            return res.status(200).json(data);
        });

    

  });
};