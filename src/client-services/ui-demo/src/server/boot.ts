import moduleAlias from 'module-alias';

import { readFileSync } from 'fs';
import { join } from 'path';
import https from 'https';

moduleAlias.addPath(__dirname);
moduleAlias.addAlias('common', join(__dirname, '../common'));
moduleAlias();

import { config } from './lib/config';

import { initApp } from './app';

const { port, useHttps } = config;

async function boot(): Promise<void> {
  const app = await initApp();

  if (useHttps) {
    const options = {
      key: readFileSync(join(__dirname, '../../.ssl', 'ssl.key')),
      cert: readFileSync(join(__dirname, '../../.ssl', 'ssl.crt')),
    };

    https.createServer(options, app.callback()).listen(port, listenCallback);
  } else {
    app.listen(port, listenCallback);
  }
}

function listenCallback(): void {
  console.log(`Application started on port ${port}`);
}

boot();
