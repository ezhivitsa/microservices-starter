import { Middleware, RouterContext } from '@koa/router';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { ClientConfig } from 'common/general-types';

import { getComponentsWithDemo } from 'lib/prepare-components';
import { config } from 'lib/config';

import { IndexPage, IndexPageProps } from 'pages/index-page';

export const indexPageMiddleware: Middleware = (ctx: RouterContext): void => {
  const clientConfig: ClientConfig = {
    components: getComponentsWithDemo(),
  };

  const props: IndexPageProps = {
    staticUrl: config.staticUrl,
    buildPath: config.buildPath,
    clientConfig,
  };

  const html = createElement(IndexPage, props);

  ctx.set('content-type', 'text/html; charset=utf-8');
  ctx.body = `<!doctype html>${renderToString(html)}`;
};
