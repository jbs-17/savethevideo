import { MongoError } from "mongodb";
import { db } from "./db.js";
import { AppError } from "../services/app-error-service.js";

/**
 * DELETE - delete user
 *
 * @export
 * @async
 * @param {string} uuid 
 */
export async function deleteUser(identifier) {
  const or = [
    { email: identifier },
    { username: identifier },
    { _id: identifier },
    { phone: identifier }
  ]
  return await db.collection("user").deleteOne({ $or: or });
}

