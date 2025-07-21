
import express from 'express';
import sendRes from '../helper/sendRes.js';
import 'dotenv/config';
import { authenticateUser } from '../middleware/authentication.js';
import User from '../models/Users.js';

const router = express.Router();


router.put('/', authenticateUser ,async(req, res) => {
   
   try{

    const {city , country} = req.body;
    const user = await User.findByIdAndUpdate({_id : req.user._id}, {city, country},{
        new: true,
    }).exec(true);
    sendRes(res, 200, "User updated successfully", user, false);
}
   catch(err){
    sendRes(res , 500 , null , true , err.message || "Something Went Wrong" );

   }
   
});





export default router;