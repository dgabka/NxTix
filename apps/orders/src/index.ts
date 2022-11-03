import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const { JWT_KEY, ORDERS_MONGO_URI, ORDERS_PORT } = process.env;
  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!ORDERS_MONGO_URI) {
    throw new Error('AUTH_MONGO_URI must be defined');
  }
  try {
    await mongoose.connect(ORDERS_MONGO_URI);
  } catch (e) {
    console.error(e);
  }
  app.listen(ORDERS_PORT, () => {
    console.log(`Listening on port ${ORDERS_PORT}`);
  });
};

start();

const close = () => {
  process.exit();
};

process.on('SIGINT', close);
process.on('SIGTERM', close);
