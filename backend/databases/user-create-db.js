import { db } from "./db.js";


/**
 * CREATE - Menambahkan user baru
 *
 * @export
 * @async
 * @param {{username: string, email: string, phone: string, password: string}} user 
 */
export async function createUser(user) {
  return await db.collection("user").insertOne(user); // throw otomatis kalau error
}