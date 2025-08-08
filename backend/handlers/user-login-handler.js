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
    let identifier;
    for (const i in req.body) {
        if (i !== "password" && identifierFields.includes(i)) {
            identifier = i;
        }
    }
    if (!identifier)
        return res.status(400).fail("one identifier field required!");
    try {
        (await userLoginService(req.body[identifier], password)) ? console.log(0) : console.log(1); return res.status(200).success("login succes", user);
    } catch (error) {
        return res.status(500 || error.statusCode).fail(error.message);
    }
};
