import config from './configs/config.js';
import express from 'express';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import chalk from 'chalk';

//
import youtube from './routes/youtube-route.js'

const limiter = rateLimit({
  windowMs: 1000 * 5,
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
})



const app = express();
app.use(cookieParser());
app.use(limiter);
app.use((req, res, next) => {
  const { ip, method, url, path, cookies, } = req;
  const start = Date.now();
  res.on('finish', () => {
    console.log(chalk.rgb(200, 200, 200).bgRgb(0, 0, 0)(` ${ip} `) + chalk.rgb(255, 255, 255).bgRgb(25, 25, 25)(` ${method} `) + chalk.rgb(255, 253, 253).bgRgb(40, 40, 40)(` ${path} `) + chalk.bgRgb(255, 255, 255).rgb(0, 0, 0)(` ${Date.now() - start} `));
  })
  res.set('x-author', 'jbs');
  next();
})



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/youtube/', youtube)


app.listen(config.PORT, () => {
  console.log(`app listening on port ${config.PORT}`);
});