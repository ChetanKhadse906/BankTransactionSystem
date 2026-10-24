import config  from './config.js' 
import mongoose from 'mongoose'

const ConnectDB=async()=>{

    try{

        await mongoose.connect(config.MONGO_URI);

        console.log("Connected to DB Successfully")
    }

    catch(err)
    {
        console.log("Unable to connect to DB, Error: ", err);

        process.exit(1);
    }
}

export default ConnectDB;