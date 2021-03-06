import { lib } from '@packages/server';

import { initApp } from '../app/app';

process.env.OVERRIDE_ENV = lib.Environment.testing;

async function boot(): Promise<void> {
  const app = await initApp();
  app.listen();
}

boot();
