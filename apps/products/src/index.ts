import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  const { JWT_KEY, PRODUCTS_MONGO_URI, PRODUCTS_PORT } = process.env;

  if (!JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!PRODUCTS_MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
    await mongoose.connect(PRODUCTS_MONGO_URI);
  } catch (e) {
    console.error(e);
  }
  app.listen(PRODUCTS_PORT, () => {
    console.log(`Listening on port ${PRODUCTS_PORT}`);
  });
};

start();

const close = () => {
  process.exit();
};

process.on('SIGINT', close);
process.on('SIGTERM', close);
