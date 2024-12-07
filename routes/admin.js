import express from 'express';
import { addtrain, gettrains  } from '../controllers/admincontroller.js';
import { apikeymiddleware} from '../middleware/apikeymiddleware.js';

export const adminRouter = express.Router();


adminRouter.post('/trains', apikeymiddleware, addtrain);
adminRouter.get('/gettrains', apikeymiddleware, gettrains);