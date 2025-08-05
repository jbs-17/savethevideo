import { db } from "./db";



/**
 * READ - Mencari info user berdasarkan identifier
 *
 * @export
 * @async
 * @param {string} identifier email || phone || username
 */
export async function userLoginFindDB(identifier) {
  return await db.collection("user").findOne({
    $or: [
      { username: identifier },
      { email: identifier },
      { phone: identifier }
    ]
  });
}
