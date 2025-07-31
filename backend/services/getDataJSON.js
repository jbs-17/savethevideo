import { exec } from 'node:child_process';
import jsonfile from 'jsonfile';
import { randomUUID } from 'node:crypto';
import config from '../configs/config.js';
import path from 'node:path';
import fs from 'node:fs/promises';


/**
 * menjalankan dan menhasilkan kembalian dari `yt-dlp -J <URL>`
 * @param {URL} url url sebuah media di internet bisa video audio gambar
 * @returns {Promise<{"title", "tipe"?}>} megembalikan JSON data suatu media yang dapat di unduh lewat `yt-dlp` (image, )
 * @throws {Error}
 */
function getDataJSON(url) {
  const tempfile = path.join(config.tempdir, randomUUID() + '.json');
  return new Promise((resolve, reject) => {
    exec(`yt-dlp -J --encoding utf8 "${url}" > ${tempfile}`, async (error, stdout, stderr) => {
      if (error) {
        fs.unlink(tempfile);
        return reject(error)
      } else {
        try {
          const data = await jsonfile.readFile(tempfile, { encoding: 'utf8' });
          // await fs.unlink(tempfile);
          return resolve(data);
        } catch (error) {
          fs.unlink(tempfile);
          return reject(error);
        }
      }
    });
  })
}
export { getDataJSON }
export default { getDataJSON }



try {
  // console.log(await getDataJSON("https://www.tiktok.com/@kangdedicolltions/video/7530193845074578706?is_from_webapp=1&sender_device=pc"));
  // console.log(await getDataJSON("https://www.tiktok.com/@ngtrjdn"));
  //console.log(await getDataJSON("https://www.youtube.com/watch?v=sORpofv3ESM&list=PLcooF13HWc21Ds5yVJnDBxEjK41h-PtK5&index=2"));
} catch (error) {
  console.log(error);
}