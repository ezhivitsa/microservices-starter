import { RouterAppMiddleware, RouterAppContext } from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

import { ClientConfig } from 'common/general-types';

import { getComponentsWithDemo } from 'lib/prepare-components';
import { config } from 'lib/config';

import { IndexPage, IndexPageProps } from 'pages/index-page';

export const indexPageMiddleware: RouterAppMiddleware = (ctx: RouterAppContext): void => {
  const clientConfig: ClientConfig = {
    components: getComponentsWithDemo(),
    apiPath: config.apiPath,
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
