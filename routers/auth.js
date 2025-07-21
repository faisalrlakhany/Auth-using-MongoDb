import express from "express";
import User from "../models/Users.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import sendRes from "../helper/sendRes.js";

const router = express.Router();

const registerSchema = Joi.object({
    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
    password: Joi.string().min(6),
    fullname: Joi.string().alphanum().min(3).max(30).required(),
})

router.post('/register', async (req, res) => {

    const { error, value } = registerSchema.validate(req.body);


    if (error) return sendRes(res, 400, error.message, null, true);

    const user = await User.findOne({ email: value.email });
    if (user) return sendRes(res, 403, `User with email ${value.email} already exists`, null, true);


    const hashedPassword = await bcrypt.hash(value.password, 12);
    value.password = hashedPassword;

    let newUser = new User({ ...value });
    newUser = await newUser.save();

    sendRes(res, 201, "User registered successfully", newUser, false);

    console.log("hashedPassword", hashedPassword);

})

router.post('/login', (req, res) => {

})



export default router;