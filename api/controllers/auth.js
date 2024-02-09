import { db } from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req,res) =>{
    //Check if user exists 
    const q = "SELECT * from users WHERE username =?"

    db.query(q,[req.body.username],(err,data)=> {
        if(err)
            return res.status(500).json(err)
        if(data.length) return res.status(409).json("User already exsists!")
    })

    //Create new user 
        //Hash password
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);
        
        //Adding user into Database 
        const q1 = "INSERT INTO users (username,password) VALUE (?)"
        const values =[req.body.username,hashedPassword];
        
        db.query(q1,[values],(err,data)=>{
            if(err)
                return res.status(500).json(err)
            return res.status(200).json("User has been created!");
        });
        
}
export const login = (req,res) =>{

    // Retrieving user information
    const q = "SELECT * FROM users WHERE username=(?)"

    db.query(q,[req.body.username],(err,data)=>{
        if(err)
                return res.status(500).json(err)
        //Check if user exists
        if(data.length==0) return res.status(404).json("User not found");

        //Checking if passwords are same 
        const checkPassword = bcrypt.compareSync(req.body.password,data[0].password);

        if(checkPassword == false)
        {
            return res.status(400).json("Wrong password or username");
        }

    //Sending JWT to store the correct login info
    const token = jwt.sign({id:data[0].id} ,"secretkey");

    const {password, ...others} = data[0];

    res.cookie("accessToken",token,{
        httpOnly : true,
    }).status(200).json(others);
    });
};

export const logout = (req,res) =>{
    res.clearCookie("accessToken",{
        secure : true,
        sameSite:"none"
    }).status(200).json("User has been logged out");
    
}

