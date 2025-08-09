import { userSessionService } from "../services/user-session-service.js";

/**
 * a
 *
 * @export
 * @async
 * @param {ExpressRequest} req 
 * @param {ExtendedResponse} res 
 * @returns {*} 
 */
export async function userSession(req, res) {
  try {
    const { sessionId } = req.body;
    const data = await userSessionService(sessionId);
    if (!data) return res.status(404).fail('session not found', null);
    res.success('session found', data);
  } catch (error) {
    res.fail(error.message, null, error);
  }
}