import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const { JWT_KEY, PAYMENTS_MONGO_URI, PAYMENTS_PORT } = process.env;

  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!PAYMENTS_MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(PAYMENTS_MONGO_URI);
  } catch (e) {
    console.error(e);
  }
  app.listen(PAYMENTS_PORT, () => {
    console.log(`Listening on port ${PAYMENTS_PORT}`);
  });
};

start();

const close = () => {
  process.exit();
};

process.on('SIGINT', close);
process.on('SIGTERM', close);
