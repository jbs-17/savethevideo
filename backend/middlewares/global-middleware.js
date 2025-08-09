import { session } from "../test/session.js";
/**
 * Description placeholder
 *
 * @param {ExpressRequest} req 
 * @param {ExtendedResponse} res 
 * @param {import("express").NextFunction} next 
 */
const globalMiddleware = (req, res, next) => {
    res.info = {
        code: null,
        message: null
    };
    next()
};

export { globalMiddleware };
