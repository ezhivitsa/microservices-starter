import { mongo } from 'mongoose';

export function generateId(): string {
  const objectId = mongo.ObjectID.generate();
  return objectId.toString('hex');
}
