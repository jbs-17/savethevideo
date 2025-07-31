import config from "./configs/config.js";
import express from "express";
import cookieParser from "cookie-parser";

//middlewares
import { globalMiddleware } from "./middlewares/globalMiddleware.js";
import { globalLimiter } from "./middlewares/globalLimiter.js";
import { globalLogging } from "./middlewares/globalLogging.js";

//routers
import youtube from "./routers/youtube.js";

//handler
import { rootHandler } from "./handlers/rootHandler.js";
import { aboutHandler } from "./handlers/aboutHandler.js";

//app
const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', config.viewsdir)

//middlewares
app.use([globalMiddleware,globalLimiter,globalLogging]);
app.use(cookieParser());
app.use(express.json());

//routers
app.get("/", rootHandler);
app.get('/about', aboutHandler);



app.use("/api/youtube", youtube);


//404 handler
app.use((req, res, next) => {
  res.status(404).send('Not Found'); // Or render a custom 404 page
});


//general error handling;
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).send('Something broke!'); // Send a generic error response
});

//litsten 
app.listen(config.PORT, () => {
    console.log(`app listening on port ${config.PORT}`);
});
