import mongoose  from "mongoose";
import bcrypt from 'bcryptjs'

// define the structure of your schema
const userSchema=new mongoose.Schema({

    Email: {
       type: String,
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

    Username:{
        type: String,
        required: [true, "Username is required"]
    }
},
    {
        timestamps: true
    }
)

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("Password")) {
    return;
  }

  this.Password = await bcrypt.hash(this.Password, 10);
});

// Compare password during login
userSchema.methods.comparePassword = async function (password) {

    console.log(password, this.password)
  return bcrypt.compare(password, this.Password);
};


// create model to perfrom the operations
const userModel=mongoose.model("User", userSchema);

export default userModel;