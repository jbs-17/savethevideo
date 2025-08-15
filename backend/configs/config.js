import dotenv from "dotenv";'dotenv';
import 'dotenv/config';
import path from "node:path";
dotenv.config();



const config = {};
config.workdir = path.resolve((import.meta.dirname + '/..'));
config.tempdir = fromWorkDir('/temp');
config.viewsdir = fromWorkDir('/views');
config.PORT = process.env.PORT || 3000;
config.MONGODB_URI = process.env.MONGODB_URI;
config.FRONTEND = process.env.FRONTEND;
console.log(config);


//ejs
config.maintitle = 'savethevideo API';



function fromWorkDir(join) {
  return path.join(config.workdir, join);
}

export default config;
