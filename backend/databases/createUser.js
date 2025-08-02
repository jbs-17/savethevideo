import { db } from "./db.js";
/**
 * CREATE - Menambahkan user baru
 * @param {Object} user - Data user
 * @returns {Promise<{status: boolean, data: import("mongodb").InsertOneResult|null, error?: any}>}
 */
async function createUser(user) {
  try {
    const result = await db.collection("user").insertOne(user);
    return { status: true, data: result };
  } catch (error) {
    return { status: false, data: null, error };
  }
}

export { createUser }