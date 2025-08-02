
import { randomUUID } from "node:crypto";

import { createUser } from "../databases/user-create-db.js";

import { hashPassword } from "../utils/hashPassword.js";

import validator from 'validator';
const { isEmail, isMobilePhone } = validator;




/**
 * Service untuk register user baru
 * Koneksi Create User ke Db
 *
 * @export
 * @async
 * @param {object} param0
 * @param {string} param0.username 
 * @param {string} [param0.email=''] 
 * @param {string} [param0.phone=''] 
 * @param {string} param0.password 
 */
// services/user-register-service.js
export async function userRegisterService({ username, email = '', phone = '', password }) {
  const isValid = email
    ? (isEmail(email) ? true : 'invalid email format')
    : (isMobilePhone(phone) ? true : 'invalid phone format');

  if (isValid !== true) {
    throw new Error(isValid);
  }
  if (email === '') email = null;
  if (phone === '') phone = null;
  const user = {
    username,
    email: email || null,
    phone: phone || null,
    password: hashPassword(password),
    uuid: randomUUID(),
    createdAt: new Date(),
    updateAt: new Date()
  };

  try {
    const result = await createUser(user);
    return result;
  } catch (err) {
    // if (err.code === 11000) {
    //   const field = Object.keys(err.keyPattern)[0];
    //   const value = err.keyValue[field];
    //   throw new Error(`${field} "${value}" already exists`);
    // }

    throw err; // lempar ulang jika bukan error yang dikenali
  }
}
