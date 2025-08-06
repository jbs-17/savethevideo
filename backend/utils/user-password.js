import crypto from 'node:crypto';


/**
 * Fungsi untuk hashing password
 * @param {String} password plain password
 * @returns {string} hashed salted password
 */
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return `${salt}:${hash}`;
}


/**
 * verifikasi password dengan pasword yang sudah di hash
 * Fungsi untuk memverifikasi password
 * @param {String} password password plain yang dimasukan
 * @param {String} hashedPassword password yang sudah di hash
 * @returns {boolean} Boolean untuk hasil verifikasi password
 */
function verifyPassword(password, hashedPassword) {
  const [salt, hash] = hashedPassword.split(':');
  const newHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha256').toString('hex');
  return newHash === hash;
}


export {verifyPassword, hashPassword}