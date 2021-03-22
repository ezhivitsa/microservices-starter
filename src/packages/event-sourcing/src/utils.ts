import { Types } from 'mongoose';

export function generateId(): string {
  const objectId = Types.ObjectId();
  return objectId.toString();
}
