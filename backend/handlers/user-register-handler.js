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
    // Cek field wajib
    if (!validateUserRegisterInput(req.body)) {
      throw new AppError("required fields: obilphone or email and password, ", 400);
    }

    const result = await userRegisterService(req.body);
    res.success("Register success", result);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode || 400).fail(error.message,);
    }
    if (error instanceof MongoError) {
      if (error.code === 11000) return res.fail(duplicateKeyError(error,))
      return res.fail(error.message, req.body)
    }

    res.fail(error.message || "Register failed!");
  }
};

/**
 * Mongodb error
 * @param {MongoError} [error] 
 */
function duplicateKeyError(error) {
  return Object.keys(error['keyValue'])[0] + ' have benn registred';
}
function validateUserRegisterInput({ password, email, phone }) {
  if (!password) return false;
  if (!email && !phone) return false;
  return true;
}
