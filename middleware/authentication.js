
import sendRes from '../helper/sendRes.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import User from '../models/Users.js';


export async function authenticateUser(req, res , next) {
   
   try{

    console.log("authorization ==> " , req.headers.authorization );

    const bearerToken = req?.headers?.authorization
    const token = bearerToken?.split(" ")[1];
    if (!bearerToken) {
        return sendRes(res , 403 , null , true  , "Token Not provided")
    }

   
    const decodedToken = jwt.verify(token, process.env.AUTH_SECRET);

    if (decodedToken) {
        const user = await User.findById(decodedToken._id)
        if (!user) {
            return sendRes(res, 403, null, true, "User not found");
        }
        req.user = decodedToken;
        next()
    }else{
        sendRes(res , 500 , null , true , "Something Went Wrong")
    }
    

   } 
   catch(err){
    sendRes(res , 500 , null , true , "Something Went Wrong")

   }
   
};

