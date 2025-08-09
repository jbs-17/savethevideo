import { createSessionDB } from "../databases/user-create-session-db.js";
import { userFindByIdentifierDB } from "../databases/user-find-identifier-db.js";
import { verifyPassword } from "../utils/user-password.js";
import { AppError } from "./app-error-service.js";
import { randomUUID } from 'node:crypto';

export async function userLoginService(identifier, password) {
    const user = await userFindByIdentifierDB(identifier);
    if (!user) throw new AppError("user not found", 404);
    const verified = verifyPassword(password, user.password);
    if (!verified) return { status: false };
    const sessionID = randomUUID().replaceAll('-', '-S');
    const sessionDocument = {
        _id: sessionID,
        userId: user._id,
        createdAt: new Date()//TTL
    };
    return (await createSessionDB(sessionDocument)) ? { status: true, sessionID } : { status: false };
}