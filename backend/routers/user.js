
import express from 'express';

//controlers
import { userGLobal } from '../middlewares/userGLobal';

const app = express();

app.use(userGLobal);

// /api/user/

app.post('/register', userRegister);

// app.post('/login', userLogin);

// app.post('/logout', userLogout);

// app.post('/delete', userDelete);