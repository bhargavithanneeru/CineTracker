import { db } from "../connect.js";
import jwt from "jsonwebtoken";


export const GetMovies = (req,res) =>
{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in!");

    //Retrieving current user's info
    jwt.verify(token, "secretkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid!");

        const q = "SELECT * FROM movies WHERE title like '%' ? '%' LIMIT 10;";

        db.query(q, [req.body.input], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json(data);
        });

    

  });
};