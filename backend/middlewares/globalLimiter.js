import rateLimit from 'express-rate-limit';
const globalLimiter = rateLimit({
  windowMs: 1000 * 1,
  standardHeaders: true,
  legacyHeaders: false,
  max: 1,
  handler: (req, res, next, options) => {
    res.status(429)
      .json({
        status: 'error',
        message: `terlalu banyak rekwes untuk ${req.ip} ! coba lagi setelah beberapa saat!`,
        ip: req.ip,
        ...res.getHeaders()
      })
  },
});

export {globalLimiter};