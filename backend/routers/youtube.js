import express from 'express';
import { getYoutubeVideoInfo } from '../handlers/youtube-get-video-info-handler.js';

const youtube = express.Router();

// prefix: /api/youtube/

// GET /video/info/full?url=https://youtube.com/watch?v=xxxxx
youtube.get('/video/info/full', getYoutubeVideoInfo);

export default youtube;
export {youtube}
