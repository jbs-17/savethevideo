import { db } from "./db.js";


export async function userSessionFindDB(sessionId) {
  const session = await db.collection('sessions').findOne({_id: sessionId});
  return session
}