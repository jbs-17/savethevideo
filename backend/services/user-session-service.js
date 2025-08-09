

import { userSessionFindDB } from "../databases/user-find-session-db.js";
import { userFindByIdentifierDB } from "../databases/user-find-identifier-db.js";


/**
 * Description placeholder
 *
 * @export
 * @async
 * @param {string} sessionId 
 * @returns {*} 
 */
export async function userSessionService(sessionId) {
  const session = await userSessionFindDB(sessionId);
  if (!session) return null;
  const user = await userFindByIdentifierDB(session.userId);
  return user;
}