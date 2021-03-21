import { db } from '@root/lib/db';

export async function cleanDB(): Promise<void> {
  const collections = db.mongo.collections;
  const promises = Object.values(collections).map((collection) => {
    return collection.deleteMany({});
  });
  await Promise.all(promises);
}
