import { AppError } from "../services/app-error-service";



/**
 * Description placeholder
 *
 * @async
 * @param {ExpressRequest} req 
 * @param {ExtendedResponse} res 
 * @returns {Promise<void>} 
 */
const userLogin = async (req, res) => {
  const { username, email, phone, password } = req.body;
  if (!password) {
    return res.status(400).fail('password field required!');
  }
  try {
    
  } catch (error) {
    res.fail(error.)
  }
}