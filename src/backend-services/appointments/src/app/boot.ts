import moduleAlias from 'module-alias';

import { lib } from '@packages/backend-service';

moduleAlias.addAlias('@root', __dirname);
moduleAlias();

import { logger } from './lib/logger';
import { kafka } from './lib/kafka';
import { config } from './lib/config';

import { initApp } from './app';

async function boot(): Promise<void> {
  const app = await initApp();

  app.listen(listenCallback);
}

function listenCallback(): void {
  logger.info('Application started');
}

boot();
lib.initPing(config.port, kafka);
