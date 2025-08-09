// index.js

import config from "./configs/config.js";
import express from "express";
import cookieParser from "cookie-parser";

// db init
import './databases/db.js';

// middlewares
import { globalMiddleware } from "./middlewares/global-middleware.js";
import { globalLimiter } from "./middlewares/limiter-global-middleware.js";
import { globalLogging } from "./middlewares/global-logging-middleware.js";
import { responseWrapper } from "./middlewares/response-wrapper-middleware.js";

// routers
import { user } from './routers/user-router.js';
import { youtube } from './routers/youtube.js';
// handlers
import { rootHandler } from "./handlers/root-handler.js";
import { aboutHandler } from "./handlers/about-handler.js";

// app
const app = express();

// middleware untuk parsing request
app.use(cookieParser());
app.use(express.json());

// endpoint non-API
app.get("/", rootHandler);
app.get('/about', aboutHandler);

// global middlewares
app.use([
  globalMiddleware,
  globalLimiter,
  globalLogging,
  responseWrapper // <-- Tambahkan wrapper di sini
]);

// routers
app.use('/api/user', user);
app.use('/api/youtube', youtube)
// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Not found", data: null });
});

// general error handling
app.use((err, req, res, next) => {
  console.error(err.message); // opsional, logging error
  
  res.status(500).json({ status: false, message: err.message || "Internal server error", data: null, error: err });
});

// listen
app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}`);
});
