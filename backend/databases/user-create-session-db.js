import { db } from "./db.js";



/**
 * CREATE - buat sesi login user
 *
 * @export
 * @async
 * @param {{_id: string, userId: string, createdAt: Date}} sessionDocument
 */
export async function createSessionDB(sessionDocument) {
  return await db.collection("sessions").insertOne(sessionDocument);
}
