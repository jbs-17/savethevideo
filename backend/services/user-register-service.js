
import { randomUUID } from "node:crypto";

import { createUser } from "../databases/user-create-db.js";

import { hashPassword } from "../utils/user-password.js";

import validator from 'validator';
import { usernameGenerator } from "../utils/username-generator.js";
import { AppError } from "./app-error-service.js";
const { isEmail, isMobilePhone } = validator;




/**
 * Service untuk register user baru
 * Koneksi Create User ke Db
 *
 * @export
 * @async
 * @param {object} param0
 * @param {string} [param0.email=''] 
 * @param {string} [param0.phone=''] 
 * @param {string} param0.password
 */
export async function userRegisterService({ email = '', phone = '', password }) {
  const isValid = email
    ? (isEmail(email) ? true : 'invalid email format')
    : (isMobilePhone(phone) ? true : 'invalid phone format');

  if (isValid !== true) {
    throw new AppError(isValid, 400);
  }
  if (phone === '') phone = null;
  if (email === '') email = null;
  const user = {
    username: usernameGenerator(),
    email,
    phone,
    password: hashPassword(password),
    uuid: randomUUID(),
    createdAt: new Date(),
    updateAt: new Date()
  };
  const result = await createUser(user);
  return { username: user.username, email, phone, uuid: user.uuid };
}
