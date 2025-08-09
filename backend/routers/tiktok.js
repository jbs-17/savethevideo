import express from "express";

import { tiktokGetVideoInfoFull } from "../handlers/tiktok-get-video-info--full-handler.js";
export const tiktok = express.Router();
tiktok.get("/video", tiktokGetVideoInfoFull);
