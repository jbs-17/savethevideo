// index.js

import config from "./configs/config.js";
import express from "express";
import cookieParser from "cookie-parser";

// db init
import './databases/db.js';

// middlewares
import { globalMiddleware } from "./middlewares/globalMiddleware.js";
import { globalLimiter } from "./middlewares/globalLimiter.js";
import { globalLogging } from "./middlewares/globalLogging.js";
import { responseWrapper } from "./middlewares/responseWrapper.js";

// routers
import { user } from './routers/user.js';

// handlers
import { rootHandler } from "./handlers/rootHandler.js";
import { aboutHandler } from "./handlers/aboutHandler.js";

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

// 404 handler
app.use((req, res) => {
  res.status(404).json({ status: false, message: "Not found", data: null });
});

// general error handling
app.use((err, req, res, next) => {
  console.error(err); // opsional, logging error
  res.status(500).json({ status: false, message: "Internal server error", data: null, error: err });
});

// listen
app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}`);
});
