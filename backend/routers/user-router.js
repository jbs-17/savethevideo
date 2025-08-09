import express from "express";

//controlers
import { userGLobal } from "../middlewares/user-global-middleware.js";
import { userRegister } from "../handlers/user-register-handler.js";
import { userLogin } from "../handlers/user-login-handler.js";
import { userDelete } from "../handlers/user-delete-handler.js";
import { userSession } from "../handlers/user-session-handler.js";
const user = express.Router();

// @ts-ignore
user.use(userGLobal);
// /api/user/

// @ts-ignore
user.post("/register", userRegister);
// @ts-ignore
user.post("/login", userLogin);
// @ts-ignore
user.post('/session', userSession);
// user.post('/logout', userLogout);

user.post('/delete', userDelete);

export { user };
