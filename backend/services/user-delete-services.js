import { deleteUser } from "../databases/user-delete-db.js";
import { verifyPassword } from "../utils/user-password.js";
import { AppError } from "./app-error-service.js";

export async function userDeleteService(identifier) {
  const del = await deleteUser(identifier);
  return del.deletedCount !== 0 ? true : false;
}
