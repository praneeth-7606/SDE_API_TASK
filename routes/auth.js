import express from 'express';


import { registeruser,loginuser } from '../controllers/authcontroller.js';

export const authRouter = express.Router();


authRouter.post('/signup', registeruser);


authRouter.post('/login', loginuser);
