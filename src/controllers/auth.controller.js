import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import emailService from '../services/email.service.js'

// user is created after unique credentials(email) is checked in the middleware
const registerUser=async(req, res)=>{

    const{username, email, password}=req.body;

    const user=await userModel.create({

        Username: username,
        Email: email,
        Password: password
    })

    res.status(201).json({

        message: "User created Successfully",
        user
    })

    await emailService.sendRegistrationEmail(user.Email, user.Username)
}


// login user
const loginUser=async(req, res)=>{

    const user=req.user;

    // create jwt token for the user
    const token=await jwt.sign({
        
        id: user._id 
    }, config.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    )

    // store the token inside the cookie(cookie-parser)
    res.cookie("token", token)

    // return response to user 
    return res.status(200).json({

        message: "User log in Scuuessfully",

        user,
        token
    })
}
export default {registerUser, loginUser};