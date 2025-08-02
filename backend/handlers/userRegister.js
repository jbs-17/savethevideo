// handlers/userRegister.js

import { randomUUID } from "node:crypto";
import { hashPassword } from "../utils/hashPassword.js";
import isEmail from "validator/lib/isEmail.js";
import { isMobilePhone } from "validator";
import { createUser } from "../db/createUser.js";

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<any>}
 */
const userRegister = async (req, res) => {
  const { name, username, password, email, phone } = req.body;

  // Validasi dasar
  if (!isEmail(email)) {
    return res.fail("Invalid email format", email + ' is invalid email format');
  }

  if (!isMobilePhone(phone, "id-ID")) {
    return res.fail("Invalid phone number (ID)", phone + ' is invalid phone format');
  }

  try {
    const user = {
      name,
      username,
      email,
      phone,
      password: hashPassword(password),
      uuid: randomUUID(),
      createdAt: new Date(),
      updateAt: new Date()
    };

    const result = await createUser(user);

    if (!result.status) {
      return res.json({
        status: false,
        message: "Failed to create user",
        data: null,
        error: result.error
      });
    }

    res.json({
      status: true,
      message: "User registered successfully",
      data: result.data
    });
  } catch (error) {
    res.status(500);
    res.fail('internal server error!', error)
  }
};

export { userRegister };
