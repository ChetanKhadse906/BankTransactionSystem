import accountModel from '../models/account.model.js'

const createUserAccount=async(req, res)=>{

    const user=req.user;

    // create account of the user using same Information (from user Schema)+ (from account Schema) 
    const account=await accountModel.create({

        User: user._id
    })

    return res.status(201).json({

        message: "User account is created Succesfully",

        account
    })
}

export default {createUserAccount};