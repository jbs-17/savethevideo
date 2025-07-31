import chalk from 'chalk';
 const globalLogging = (req, res, next) => {
  const { ip, method, url, path, cookies, } = req;
  const start = Date.now();
  res.on('finish', () => {
    const {code, message} = res.info;
    let messageLog;
    switch (code) {
      case 0:
        messageLog = chalk.black.bgGreen(message);
        break;
      case 1:
        messageLog = chalk.black.bgYellow(message);
        break;
      default:
        messageLog = chalk.black.bgGray(`message ?? 'no log message'`);
    }
    console.log(chalk.rgb(200, 200, 200).bgRgb(0, 0, 0)(` ${ip} `) + chalk.rgb(255, 255, 255).bgRgb(25, 25, 25)(` ${method} `) + chalk.rgb(255, 253, 253).bgRgb(40, 40, 40)(` ${path} `) + chalk.bgRgb(255, 255, 255).rgb(0, 0, 0)(` ${Date.now() - start} `) + messageLog + '\n');
  })
  res.set('x-dev', 'jbs');
  next();
}


export {globalLogging};