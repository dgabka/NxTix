import { registerAs } from '@nestjs/config';

export default registerAs('services', () => ({
  auth: {
    host: process.env.SERVICE_AUTH_HOST || 'localhost',
    port: process.env.SERVICE_AUTH_PORT || 5001,
  },
  users: {
    host: process.env.SERVICE_USERS_HOST || 'localhost',
    port: process.env.SERVICE_USERS_PORT || 5002,
  },
  gateway: {
    host: process.env.SERVICE_GATEWAY_HOST || 'localhost',
    port: process.env.SERVICE_GATEWAY_PORT || 5000,
  },
}));
