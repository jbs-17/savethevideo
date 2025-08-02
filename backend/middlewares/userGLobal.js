/** 
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 */


const userGLobal = (req, res, next) => {
  res.setHeader('ok', 'yo');
  next();
}

export {userGLobal}