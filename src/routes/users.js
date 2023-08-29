//logging in / register
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js"
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password } = req.body;
    //note: js waits for a promise(await) to be fulfilled, if it gets fulfilled, it carries on, if not then it has error so we 'catch' it

    const user = await UserModel.findOne({username: username}); //the submitted username (first one in object) is equal to the username that we got from the post request (second one in object)
    
    if (user) { //if user already exists send message
        return res.json({ message: "User already exists!"})
    }

    const hashedPassword = await bcrypt.hash(password, 10) // if username is unique hash their password

    const newUser = new UserModel({ username, password: hashedPassword}) // adding user to database
    await newUser.save()

    res.json({message: "Registered Successfully!"});
});

router.post("/login", async (req, res) => {
    const {username, password } = req.body;
    //note: js waits for a promise(await) to be fulfilled, if it gets fulfilled, it carries on, if not then it has error so we 'catch' it

    const user = await UserModel.findOne({username: username}); //the submitted username (first one in object) is equal to the username that we got from the post request (second one in object)
    
    if (!user) { //if user already exists send message
        return res.json({ message: "User doesn't exist!"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password) // hashing the inputted password to see if it matches the hashed password in database

    if (!isPasswordValid) {
        return res.json({message: "Username or Password is incorrect!"})
    }

    const token = jwt.sign({ id: user._id }, "secret")
    res.json({token, userID: user._id})
})

export { router as userRouter }; //exporting the router and naming it userRouter
