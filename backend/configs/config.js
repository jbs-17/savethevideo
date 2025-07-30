import dotenv from "dotenv";'dotenv';
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from "node:path";
dotenv.config();

const config = {};
config.workdir = path.resolve((import.meta.dirname + '/..'));
config.tempdir = path.resolve(config.workdir + '/temp');
config.PORT = process.env.PORT || 3000;
config.MONGODB_URI = process.env.MONGODB_URI;
console.log(config);



export default config;