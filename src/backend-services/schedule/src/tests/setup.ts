import { lib } from '@packages/server';

import { initApp } from '../app/app';
import { db } from '../app/lib/db/models';

process.env.OVERRIDE_ENV = lib.Environment.testing;

async function boot(): Promise<void> {
  const app = await initApp();
  app.listen();
}

boot();

afterAll(async () => {
  await db.sequelize.close();
});
