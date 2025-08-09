import { db } from "./db.js";



/**
 * READ - Mencari info user berdasarkan identifier
 *
 * @export
 * @async
 * @param {string} identifier email || phone || username
 */
export async function userFindByIdentifierDB(identifier) {
  return await db.collection("user").findOne({
    $or: [
      { _id: identifier },
      { username: identifier },
      { email: identifier },
      { phone: identifier }
    ]
  });
}
