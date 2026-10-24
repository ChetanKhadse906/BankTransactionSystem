import mongoose from 'mongoose'

const accoonutSchema=new mongoose.Schema({

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Account must be associated with a user"],
        index: true
    },

    Status:{
        enum:{
            Values:["ACTIVE", "FROOZEN", "CLOSED"],

            Message: "Status can be either ACTIVE, FROOZEN or CLOSED"
        }
    },

    Currency:{
        default: "INR"
    }
},
    {
        timestamps: true
    }
)

// create model
const acoountModel=mongoose.model("Account", accoonutSchema)