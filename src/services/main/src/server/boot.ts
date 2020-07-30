import * as fs from 'fs';
import * as path from 'path';
import * as https from 'https';

import {config} from './lib/config';
import {logger} from './lib/logger';

import {app} from './app';

const {HTTPS} = process.env;

const port = config.port;

if (HTTPS) {
    const options = {
        key: fs.readFileSync(path.join(__dirname, '../../.ssl', 'ssl.key')),
        cert: fs.readFileSync(path.join(__dirname, '../../.ssl', 'ssl.crt'))
    };

    https
      .createServer(options, app.callback())
      .listen(port, listenCallback);
} else {
    app.listen(port, listenCallback);
}

function listenCallback(): void {
  logger.info(`Application started on port ${port}`);
}
