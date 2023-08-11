//logging in / register
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from "../models/Users.js"

const router = express.Router();

router.post("/register", async (req, res) => {
    const {username, password } = req.body;

    const user = await UserModel;
});

router.post("/login")

export { router as userRouter }; //exporting the router and naming it userRouter
