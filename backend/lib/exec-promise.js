import { exec } from 'node:child_process';

/**
 * Menjalankan sebuah perintah shell sebagai proses anak dan mengembalikan hasilnya dalam bentuk Promise.
 * Mengumpulkan seluruh output standar (stdout) dan output error standar (stderr) setelah proses selesai.
 *
 * @param {string} command Perintah shell yang akan dijalankan. Contoh: 'ls -l', 'node --version'.
 * @returns {Promise<{stdout: string, stderr: string}>} Promise yang akan di-resolve dengan objek berisi
 * `stdout` dan `stderr` dari perintah, atau di-reject jika terjadi error.
 * @throws {Error} Mengembalikan objek Error jika perintah gagal dijalankan (misalnya, perintah tidak ditemukan,
 * atau proses keluar dengan kode non-nol). Objek error ini mungkin memiliki properti tambahan seperti `code`
 * (exit code) dan `signal`.
 */
export default function execPromise(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        // Objek error dari Node.js child_process.exec biasanya sudah kaya informasi,
        // jadi kita bisa langsung reject dengannya.
        // Properti seperti `error.code`, `error.killed`, `error.signal`, `error.cmd`
        // akan tersedia. `stderr` juga bisa ditambahkan untuk konteks.
        error.stderr = stderr; // Tambahkan stderr untuk detail lebih lanjut
        reject(error);
        return;
      }
      resolve({ stdout, stderr });
    });
  });
}