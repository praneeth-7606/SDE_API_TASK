import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import { authRouter } from './routes/auth.js';
import { adminRouter } from './routes/admin.js';
import { userRouter } from './routes/user.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/api/auth', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
