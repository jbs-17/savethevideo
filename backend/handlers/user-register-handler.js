// handlers/userRegister.js


import { userRegisterService } from "../services/user-register-service.js";


/**
 * Description placeholder
 *
 * @async
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @returns {Promise<void>} 
 */
// handlers/user-register-handler.js
export const userRegister = async (req, res) => {
  try {
    const result = await userRegisterService(req.body);
    res.success("Register success", result);
  } catch (error) {
    res.fail(error.message || "Register failed", error, error);
  }
};
