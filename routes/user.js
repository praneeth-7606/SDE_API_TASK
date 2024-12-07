import express from 'express';
import { getavailabletrains, bookseat,getuserbookings } from '../controllers/usercontroller.js';
import { authmiddleware } from '../middleware/authmiddleware.js';

export const userRouter = express.Router();


userRouter.post('/trains', authmiddleware, getavailabletrains);

userRouter.post('/book', authmiddleware, bookseat);
userRouter.get('/bookings', authmiddleware, getuserbookings);