import userModel from '../models/user.model.js'

// Check if the user exists with the same email or not
const userExists=async(req, res, next)=>{

    const{email}=req.body;

    const user=await userModel.findOne({

        Email: email
    })

    // If exists then return response 
    if(user)
    {
        return res.status(409).json({

            message: "User already exists with this email",
            status: "failed"
        })
    }

    next();
}

// Check if the login Credentials of the user's is valid or not
const isUserValid=async(req, res, next)=>{

    const{email, password}=req.body;

    // 1--> check if the email is correct
    const user=await userModel
        .findOne({
        Email: email
        })
        .select("+Password")

        // If email does not found, or no user found the login email
    if(!user)
    {
        return res.status(401).json({

            message: "Invalid email, Enter valid email to log in",
            status: "failed"
        })
    }

    // 2--> check if the password is correct or not
    const isPasswordValid=await user.comparePassword(password, user.Password);

    // If the user's password did not match with the password entered at the time of Registration
    if(isPasswordValid===false)
    {
        return res.status(401).json({

            message: "Invalid Password",
            status: "failed"
        })
    }

    req.user=user;
    next();

}

export default {userExists, isUserValid};