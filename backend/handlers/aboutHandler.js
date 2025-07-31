/**
 * Express handler untuk halaman 'about'.
 * @param {ExpressRequest} req - Objek permintaan Express.
 * @param {ExpressResponse} res - Objek respons Express.
 */

const aboutHandler = (req, res) => {
  res.render('about', { maintitle: 'Halaman Utama', message: 'Selamat datang di aplikasi EJS kami!' });
};

export { aboutHandler };
