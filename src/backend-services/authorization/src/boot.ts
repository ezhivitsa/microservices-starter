import moduleAlias from 'module-alias';

import { readFileSync } from 'fs';
import { join } from 'path';
import https from 'https';

moduleAlias.addPath(__dirname);
moduleAlias.addAlias('common', join(__dirname, '../common'));
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
