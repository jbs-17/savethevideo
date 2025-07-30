import dotenv from "dotenv";'dotenv';
import 'dotenv/config';
dotenv.config();


const config = {};
config.PORT = process.env.PORT || 3000;
config.MONGODB_URI = process.env.MONGODB_URI;



export default config;