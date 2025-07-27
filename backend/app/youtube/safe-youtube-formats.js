
/**
 * Memfilter daftar format video dan audio aman yang tersedia dari URL YouTube yang di proses `yt-dlp -F <URL_VIDEO_YOUTUBE>`.
 * 
 * @async
 * @param {string} formats daftar formats yang didapatkan dari `yt-dlp -F <URL_VIDEO_YOUTUBE>`.
 * @returns {Promise<Array>} Promise yang megembalikan array berisi list format yang aman
 */
export default async function safeYoutubeFormats(formats) {
  const rows = formats
    .split('\n')
    .map(r => r.trim())
    .filter(r =>
      r.length > 64 &&
      r.includes('https') &&
      !r.includes('m3u8') &&
      !r.includes('untested') &&
      !r.includes('[youtube]') &&
      !r.includes('html') &&
      r.includes('|') // hanya baris dengan data
    );

  // parsing jadi objek
  const safeFormats = rows.map(row => {
    const [left, middle, right] = row.split('|').map(part => part.trim()); // 1. Potong berdasarkan |

    // `left`: ID, EXT, RESOLUTION, FPS, CH
    const [id, ext, resolution, fps, ch] = left.split(/\s+/); //2. Potong left berdasarkan spasi

    // `middle`: FILESIZE, TBR, PROTO
    const [filesize, tbr, proto] = middle.split(/\s+/); //3. Potong middle berdasarkan spasi

    // `right`: VCODEC, VBR, ACODEC, ABR, ASR, ...MORE 
    const parts = right.split(/\s+/); //Potong right jadi array parts
    const vcodec = parts[0];
    const vbr = parts[1];
    const acodec = parts[2];
    const abr = parts[3];
    const asr = parts[4];
    const moreInfo = parts.slice(5).join(' '); // sisanya gabung //5. Gabungkan sisanya jadi string “moreInfo”

    return {
      id, ext, resolution, fps, ch,
      filesize, tbr, proto,
      vcodec, vbr, acodec, abr, asr,
      moreInfo,
    };
  });
  return safeFormats;
}


