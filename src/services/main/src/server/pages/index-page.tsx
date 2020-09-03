import React, { ReactElement, ReactNode } from 'react';

import { SerializableClientConfig } from 'common/general-types';

import { isDevelopment } from 'lib/config';

import { ConfigView } from './components/config-view';
import { ImportMap } from './components/import-map';

export interface IndexPageProps {
  staticUrl: string;
  systemjsUrl: string;
  buildPath: string;
  clientConfig: SerializableClientConfig;
}

export function IndexPage({
  staticUrl,
  systemjsUrl,
  buildPath,
  clientConfig,
}: IndexPageProps): ReactElement<IndexPageProps> {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <meta name="importmap-type" content="systemjs-importmap" />

        <title>Microservices starter</title>

        <link rel="icon" type="image/png" href={`${staticUrl}/${buildPath}/public/favicon.png`} />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap" rel="stylesheet" />
        {!isDevelopment && <link rel="stylesheet" href={`${staticUrl}/${buildPath}/main.style.css`} />}
      </head>

      <body>
        <ImportMap config={clientConfig} />

        <div id="root" />

        <script defer src={`${staticUrl}/${buildPath}/main.bundle.js`} />
        <ConfigView config={clientConfig} />
      </body>
    </html>
  );
}
