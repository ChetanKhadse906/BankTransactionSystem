import mongoose from "mongoose";

const ledgerSchema=mongoose.Schema({

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "account",
        required: [true, "account is required"],
        indeX: true,
        immutable: true
    },

    amount: {
        type: Number,
        required: [true, "amount is required"],
        immutable: true
    },

    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "transaction",
        required: [true, "transaction is required"],
        index: true,
        immutable: true
    },

    type: {
        type: String,
        enum: {
            values: ["CREDIT", "DEBIT"],
            message: "Type can be either CREDIT or DEBIT"
        },

        required: [true, "ledger type is required"],
        immutable: true
    }
})

function preventLedgerModification()
{
    throw new Error("ledger entries are immutable and cannot be modified or deleted")
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('updateMany', preventLedgerModification);
ledgerSchema.pre('fidnOneAndDelete', preventLedgerModification);
ledgerSchema.pre('findOneAndReplace', preventLedgerModification);

const ledgerModel=mongoose.model("ledger", ledgerSchema);

export default ledgerModel;