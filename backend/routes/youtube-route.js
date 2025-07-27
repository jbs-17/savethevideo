import express from 'express';
import { getYoutubeFormatsHandler } from '../controlers/youtube-controlers.js';

const youtube = express.Router();

// GET /api/youtube/formats?url=https://youtube.com/watch?v=xxxxx
youtube.get('/video/formats', getYoutubeFormatsHandler);

export default youtube;
export {youtube}
