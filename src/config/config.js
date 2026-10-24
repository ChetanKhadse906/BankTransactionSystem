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

if(!process.env.CLIENT_ID)
{
    throw new Error("CLIENT_ID is not found in environment variable")
}

if(!process.env.CLIENT_SECRET)
{
    throw new Error("CLEINT_SECRET is not found in environment variable")
}

if(!process.env.REFRESH_TOKEN)
{
    throw new Error("REFRESH_TOKEN is not found in environment variable")
}

if(!process.env.EMAIL_USER)
{
    throw new Error("EMAIL_USER is not found in environment variable")
}


const  config={

    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN,
    EMAIL_USER: process.env.EMAIL_USER
}


export default config;