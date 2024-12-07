import dotenv from 'dotenv';

dotenv.config();

export const apikeymiddleware = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey === process.env.API_KEY) {
    next();
  } else {
    res.status(403).send('Invalid API Key');
  }
};
