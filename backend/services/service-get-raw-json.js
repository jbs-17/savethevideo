import execPromise from "../utils/exec-promise.js";

export default getRawJSON;
export { getRawJSON }
/**
 * Mengambil data json video dan audio yang tersedia dari URL menggunakan yt-dlp.
 * Ini setara dengan menjalankan perintah `yt-dlp -J <URL_VIDEO>`.
 *
 * @async
 * @param {string} url URL video YouTube yang ingin diperiksa formatnya.
 * @returns {Promise<{stdout: string, stderr: string}>} Promise yang akan resolve dengan objek berisi
 * output standar (`stdout`) dan output error standar (`stderr`) dari perintah yt-dlp.
 * `stdout` berisi daftar format, sementara `stderr` bisa berisi peringatan atau informasi tambahan.
 * @throws {Error} Akan melempar error jika perintah `yt-dlp` gagal dijalankan
 * (misalnya, yt-dlp tidak terinstal, URL tidak valid/tidak ditemukan oleh yt-dlp, atau masalah jaringan).
 * Objek error ini mungkin memiliki properti tambahan seperti `code` (exit code) dan `stderr` (pesan error dari yt-dlp).
 */
async function getRawJSON(url) {
  const command = `yt-dlp -J "${url}"`;
  try {
    // Diasumsikan execPromise sudah didefinisikan dengan benar dan mengembalikan Promise
    const { stdout, stderr } = await execPromise(command);
    return { stdout, stderr }; // Mengembalikan nilai actual, bukan tipe data 'string'
  } catch (error) {
    throw error;
  }
}


