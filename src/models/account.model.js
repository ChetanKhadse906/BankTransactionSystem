import mongoose from 'mongoose'

const accountSchema=new mongoose.Schema({

    User:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "Account must be associated with a user"],
        index: true
    },

    Status:{
        type: String,
        enum:{
            values:["ACTIVE", "FROZEN", "CLOSED"],
            message: "Status can be either ACTIVE, FROZEN or CLOSED"
        },
        default: "ACTIVE"
    },

    Currency:{
        type: String,
        default: "INR",
        required: [true, "Currency is required to create account"]
    }
},
    {
        timestamps: true
    }
)

// create index
accountSchema.index({User:1, Status: 1});

// create model
const accountModel=mongoose.model("Account", accountSchema)

export default accountModel;