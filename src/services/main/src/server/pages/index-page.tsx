import React, { ReactElement } from 'react';

import { isDevelopment } from '../lib/config';

import { ConfigView } from './components/config-view';

export interface IndexPageProps {
  staticUrl: string;
  clientConfig: string;
  buildPath: string;
}

export function IndexPage(props: IndexPageProps): ReactElement<IndexPageProps> {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <title>Microservices starter</title>
        <meta name="viewport" content="width=device-width,minimum-scale=1.0" />
        <link rel="icon" type="image/png" href={`${props.staticUrl}/${props.buildPath}/public/favicon.png`} />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap" rel="stylesheet" />
        {!isDevelopment && <link rel="stylesheet" href={`${props.staticUrl}/${props.buildPath}/app.style.css`} />}
      </head>

      <body>
        <div id="root" />

        <script defer src={`${props.staticUrl}/${props.buildPath}/app.bundle.js`} />
        <ConfigView content={props.clientConfig} />
      </body>
    </html>
  );
}
