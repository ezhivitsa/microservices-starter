import { ConnectOptions } from 'mongoose';

const port = Number(process.env.MONGO_PORT) || 27017;
const host = process.env.MONGO_HOST || '127.0.0.1';
const database = process.env.MONGO_DATABASE || 'appointments';
const username = process.env.MONGO_USER || 'starter';
const password = process.env.MONGO_PASSWORD || '';

export const url = `mongodb://${host}:${port}/${database}`;

export const options: ConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  auth: {
    user: username,
    password,
  },
};
