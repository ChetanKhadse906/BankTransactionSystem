import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';
import config from '../config/config.js'

const IsuserAuthenticated=async(req, res, next)=>{

    // take the token from user's cookie
    const token=( req.cookies.token || req.headers.authorization?.split(" ")[1] );

    // 2 Posibilities
    // 1--> user does not have token that means he/she is not authenticated(log In)
    if(!token)
    {
        return res.status(401).json({

            message: "Unauthorize access, token is missing",
            status: "fail"
        })
    }

    //2--> user has wrong token while verifying(jwt.verify) it will throw an error we will catch it using try-catch
    // hackers can use wrong token 
    try{
        // verify token and store the userId in decoded by which you have created token(token was created by user._id-->id: user._id ) 
        const decoded=jwt.verify(token, config.JWT_SECRET);

        // find the user in user Collection by Id
        const user=await userModel.findById(decoded.userId);

        if(!user)
        {
            return res.status(401).json({

                message: "User not found",
                status: "fail"
            })
        }

        // send the user in Controller
        req.user=user;

        next();
    } 

    // 2--> error is catch here
    catch(err)
    {
        return res.status(401).json({

            message: "Unauthorize access, token is missing",
            err
        })
    }
}

export default {IsuserAuthenticated};