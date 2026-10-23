import dotenv from 'dotenv'

dotenv.config();

if(!process.env.MONGO_URI)
{
    throw new Error("MONGO_URI is not found in environment variable");
}

if(!process.env.JWT_SECRET)
{
    throw new Error("JWT_SECRET is not found in environment variaable")
}



const config={

    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET
}


export default config;