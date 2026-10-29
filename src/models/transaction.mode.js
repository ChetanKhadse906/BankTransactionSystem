import mongoose from 'mongoose'

const transactionSchema=new mongoose.Schema({

    fromAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "transaction must be associated from account A"],
        index: true
    },

    toAccount: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "transaction must be associated to account A"],
        index: true
    },

    status: {
        type: String,
        enum: {
            values: ["PENDING", "COMPLETED", "FAILED", "REVERSED"],
            message: "Status can be either PENDING, COMPLETED, FAILED or REVERSED"
        },

        default: "PENDING"
    },

    amount: {
        type: Number,
        required: [true, "account should have amount"],
        min: [0, "no -ve amounts are accepted"]
    },

    //** 
    idempotencyKey: {
        type: String,
        required: [true, "should have one unique Idempotency Key"],
        index: true,
        unique: true
    },

},
    {
        timestamps: true
    }
)

// create model
const transactionModel=mongoose.model("transaction", transactionSchema);

export default transactionModel;