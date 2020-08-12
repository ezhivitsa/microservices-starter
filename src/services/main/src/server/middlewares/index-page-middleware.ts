import { AppMiddleware, AppContext } from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { SerializableClientConfig } from 'common/general-types';

import { IndexPage, IndexPageProps } from 'pages/index-page';

export const indexPageMiddleware: AppMiddleware = (ctx: AppContext): void => {
  const {
    featureFlagsSet,
    config: { staticUrl, buildPath, frontUpstreams },
  } = ctx.state;

  const clientConfig: SerializableClientConfig = {
    featureFlagsArray: Array.from(featureFlagsSet),
    frontUpstreams,
  };

  const props: IndexPageProps = {
    staticUrl,
    buildPath,
    clientConfig: JSON.stringify(clientConfig),
  };

  const html = createElement(IndexPage, props);

  ctx.set('content-type', 'text/html; charset=utf-8');
  ctx.body = `<!doctype html>${renderToString(html)}`;
};
