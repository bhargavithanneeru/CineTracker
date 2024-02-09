import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const AddFavorite = (req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO favorites(userid,movieid) VALUES (?)";
    const values = [
      userInfo.id, 
      req.body.id
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Favorite has been created.");
    });
  });
};

export const DeleteFavorite = (req,res)=>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM favorites WHERE userid = ? AND movieid = ?";


    db.query(q, [userInfo.id, req.body.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Favorite has been deleted.");
    });
  });
};

export const GetFavorite = (req,res) =>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM movies where id in (SELECT movieid from favorites where userid=?);";


        db.query(q, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
  
            return res.status(200).json(data);
        });

    

  });
};