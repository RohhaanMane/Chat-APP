import bcrypt from 'bcryptjs';

import User from "../models/user.model.js";
import generateTokerAndSetCookie from '../utils/generateToken.js';


export const signup = async (req, res) =>{
    try{

        const { fullName, username, password, confirmPassword, gender } = req.body;

        if(password !== confirmPassword)
        {
            return res.status(400).json({error: "Password doesn't match"});
        }

        const user = await User.findOne({username});
        if(user)
        {
            return res.status(400).json({error: "User already exist"});

        }

        // HASH password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // https://avatar.iran.liara.run/public/boy?username=Scott

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic 
        });

        if(newUser){
            // generate jwt token and set it in cookies
            generateTokerAndSetCookie(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id : newUser._id,
                fullName : newUser.fullName,
                username : newUser.username,
                profilePic : newUser.profilePic,
            });
        }else{
            res.status(400).json({error : "invalid user data"});
        }

    }catch(error)
    {
        console.log("Error in signup controller", error.message);
        res.status(500).json({error : "Internal Server Error"});
    }
}

export const login = (req, res) =>{
    console.log("Login user");
}

export const logout = (req, res) =>{
    console.log("logout user");
}