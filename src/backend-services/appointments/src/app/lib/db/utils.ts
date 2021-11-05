import { Types } from '@packages/mongo-storage';

export function generateId(): string {
  const objectId = Types.ObjectId();
  return objectId.toString();
}
