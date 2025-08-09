import { AppError } from '../services/app-error-service.js';
import { userLoginService } from '../services/user-login-services.js';
const identifierFields = ["username", "email", "phone"];

/**
 * Description placeholder
 *
 * @async
 * @param {ExpressRequest} req
 * @param {ExtendedResponse} res
 * @returns {Promise<void>}
 */
export const userLogin = async (req, res) => {
    const { username, email, phone, password } = req.body;
    if (!password) return res.status(400).fail("password field required!");

    let identifier = [];
    for (const i in req.body) {
        if (i !== "password" && identifierFields.includes(i))
            identifier.push(i);
    }
    if (!identifier || identifier.length > 1)
        return res.status(400).fail("identifier error! please use only one identifier!", { username, email, phone });
    try {
        const loggedin = (await userLoginService(req.body[identifier[0]], password));
        if (loggedin?.status) {
            res.success('login succesfull', loggedin);
        } else {
            res.fail("login failed", loggedin);
        }
    } catch (error) {
        return res.status(error.statusCode || 500).fail(error.message);
    };
}
