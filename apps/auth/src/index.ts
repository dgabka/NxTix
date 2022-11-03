import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const { JWT_KEY, AUTH_MONGO_URI, AUTH_PORT } = process.env;

  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!AUTH_MONGO_URI) {
    throw new Error('AUTH_MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(AUTH_MONGO_URI);
  } catch (e) {
    console.error(e);
  }
  app.listen(AUTH_PORT, () => {
    console.log(`Listening on port ${AUTH_PORT}`);
  });
};

start();
