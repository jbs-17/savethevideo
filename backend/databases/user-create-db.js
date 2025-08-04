import { MongoError } from "mongodb";
import { db } from "./db.js";
import { AppError } from "../services/app-error-service.js";

/**
 * CREATE - Menambahkan user baru
 *
 * @export
 * @async
 * @param {{username: string, email: string, phone: string, password: string}} user 
 */
export async function createUser(user) {
  try {
    await db.collection("user").insertOne(user);
  } catch (err) {
    if (err instanceof MongoError)
      if (err.code === 11000) {
        // duplikat entri
        throw new AppError("Email or phone already registered", 409);
      }
      console.log(err);
    throw err; // lempar ke handler kalau error selain itu
  }
}