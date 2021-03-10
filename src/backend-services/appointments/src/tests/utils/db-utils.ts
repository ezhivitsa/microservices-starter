import { mongo } from '@root/lib/db/models';

export async function cleanDB(): Promise<void> {
  const collections = mongo.collections;
  const promises = Object.values(collections).map((collection) => {
    return collection.deleteMany({});
  });
  await Promise.all(promises);
}