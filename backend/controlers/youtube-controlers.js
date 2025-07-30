import { getRawFormats } from '../services/service-get-raw-formats.js';
import { filterYoutubeFormats } from '../services/youtube-filter-youtube-formats.js';
import { db, initDatabase, client } from './db.js';



export default getYoutubeFormatsHandler;
export { getYoutubeFormatsHandler }
/**
 * Controller untuk menangani permintaan daftar format video dari URL YouTube
 */
async function getYoutubeFormatsHandler(req, res) {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'Parameter URL wajib disediakan.' });
  }
  try {
    const { stdout, stderr } = await getRawFormats(url);
    if(!stdout.toLowerCase().includes('youtu')){
      return res.json({
        status: 'error',
        message: "invalid YouTube video url"
      })
    }
    const safeFormats = await filterYoutubeFormats(stdout); // parser khusus YouTube
    return res.json({ formats: safeFormats, status: true, message: "success fetch avwailable download formats of video" });
  } catch (err) {
    return res.status(500).json({ error: 'Gagal mengambil format video.', detail: err.message });
  }
}
