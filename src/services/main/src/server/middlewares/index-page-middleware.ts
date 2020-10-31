import { RouterAppMiddleware, RouterAppContext } from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { Types } from '@packages/common';

import { IndexPage, IndexPageProps } from 'pages/index-page';

export const indexPageMiddleware: RouterAppMiddleware = (ctx: RouterAppContext): void => {
  const {
    featureFlagsSet,
    config: { staticUrl, buildPath, frontUpstreams },
  } = ctx.state;

  const clientConfig: Types.SerializableClientConfig = {
    featureFlagsArray: Array.from(featureFlagsSet),
    frontUpstreams,
  };

  const props: IndexPageProps = {
    staticUrl,
    buildPath,
    clientConfig,
  };

  const html = createElement(IndexPage, props);

  ctx.set('content-type', 'text/html; charset=utf-8');
  ctx.body = `<!doctype html>${renderToString(html)}`;
};
