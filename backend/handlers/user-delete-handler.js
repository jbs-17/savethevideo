import { userDeleteService } from "../services/user-delete-services.js";


/**
 * 
 *
 * @export
 * @async
 * @param {ExpressRequest} req 
 * @param {ExtendedResponse} res 
 */
export async function userDelete(req, res) {
  try {
    const { identifier } = req.body;
    (await userDeleteService(identifier)) ? res.success('user deleted', {}) : res.fail('failed to delete user');
  } catch (error) {
    res.status(500).fail('internal server errror')
  }
}