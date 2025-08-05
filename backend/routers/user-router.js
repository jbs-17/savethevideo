
import express from 'express';

//controlers
import { userGLobal } from '../middlewares/user-global-middleware.js';
import { userRegister } from '../handlers/user-register-handler.js';

const user = express.Router();

// @ts-ignore
user.use(userGLobal);

// /api/user/

// @ts-ignore
user.post('/register', userRegister);

user.post('/login', userLogin);

// user.post('/logout', userLogout);

// user.post('/delete', userDelete);

export { user }
