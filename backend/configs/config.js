import dotenv from "dotenv";'dotenv';

dotenv.config();
const config = {};
console.log(process.env.PORT);
config.PORT = process.env.PORT || 2999;




export default config;