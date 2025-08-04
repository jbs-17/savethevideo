// handlers/userRegister.js


import { MongoError } from "mongodb";
import { AppError } from "../services/app-error-service.js";
import { userRegisterService } from "../services/user-register-service.js";


/**
 * user register handler
 *
 * @async
 * @param {ExpressRequest} req
 * @param {ExpressResponse} res
 * @returns {Promise<void>} 
 */
// handlers/user-register-handler.js
export const userRegister = async (req, res) => {
  try {
    // Cek field wajibas
    validateBody(req.body);

    const result = await userRegisterService(req.body);
    res.success("Register success", result);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode || 400).fail(error.message,);
    }
    res.fail(error.message || "Register failed!");
  }
};

function validateBody(body) {
  if (!body.password) throw new AppError('password field required', 409);
  const ep = body.email || body.phone;
  if (!ep) { throw new AppError('email or phone fields required', 409) };
}
