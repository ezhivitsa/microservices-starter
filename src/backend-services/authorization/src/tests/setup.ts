import { lib } from '@packages/server';

import { initApp } from '../app/app';
import { redisClient } from '../app/lib/cache';
import { db } from '../app/lib/db/models';

process.env.OVERRIDE_ENV = lib.Environment.testing;

async function boot(): Promise<void> {
  const app = await initApp();
  app.listen();
}

boot();

afterAll(async () => {
  redisClient.quit();
  await db.sequelize.close();
});
