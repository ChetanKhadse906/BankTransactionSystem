import mongoose from "mongoose";

// define the structure of your schema
const userSchema=await new mongoose.Schema({

    Email: {
        tyep: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        unique: [true, "Email already exists"]
    },

    Password:{
        type: String,
        required: [true, "Password is required"],
        minLength: [6, "Password must have minimum 6 length"],
        select: false
    },

    Usrename:{
        type: String,
        required: [true, "Username is required"]
    }
},
    {
        timestamps: true
    }
)

// create model to perfrom the operations
const userModel=mongoose.model("User", userSchema);

export default userModel;