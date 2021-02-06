import moduleAlias from 'module-alias';

moduleAlias.addPath(__dirname);
moduleAlias.addAlias('@root', __dirname);
moduleAlias();

import { logger } from './lib/logger';

import { initApp } from './app';

async function boot(): Promise<void> {
  const app = await initApp();

  app.listen(listenCallback);
}

function listenCallback(): void {
  logger.info('Application started');
}

boot();
