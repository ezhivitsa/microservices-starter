import { RouterAppMiddleware, RouterAppContext } from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';

import { Types, ServiceTypes, Constants, AuthPaths } from '@packages/common';

import { config } from 'lib/config';

import { IndexPage, IndexPageProps } from 'pages/index-page';

const { versionV1, usersPrefix, currentPath } = Constants;

async function getUser(ctx: RouterAppContext): Promise<ServiceTypes.GetCurrentUserResponse | null> {
  const accessToken = ctx.cookies.get(Constants.accessToken);
  const refreshToken = ctx.cookies.get(Constants.refreshToken);

  try {
    const user = await axios.get(`${config.apiGatewayUrl}${versionV1}${usersPrefix}${currentPath}`, {
      responseType: 'json',
      withCredentials: true,
      headers: {
        Cookie: `${Constants.accessToken}=${accessToken};${Constants.refreshToken}=${refreshToken};`,
      },
    });
    return user.data;
  } catch (err) {
    return null;
  }
}

export const indexPageMiddleware: RouterAppMiddleware = async (ctx: RouterAppContext): Promise<void> => {
  const {
    featureFlagsSet,
    config: { staticUrl, buildPath, frontUpstreams, apiGatewayUrl },
  } = ctx.state;

  const clientConfig: Types.SerializableClientConfig = {
    featureFlagsArray: Array.from(featureFlagsSet),
    frontUpstreams,
    apiGatewayUrl,
  };

  console.log('url: ', ctx.url);
  if (!ctx.url.startsWith(config.frontUpstreams.auth.rule)) {
    const user = await getUser(ctx);

    if (!user) {
      ctx.redirect(AuthPaths.signinPath(ctx.url, true));
      return;
    }
  }

  const props: IndexPageProps = {
    staticUrl,
    buildPath,
    clientConfig,
  };

  const html = createElement(IndexPage, props);

  ctx.set('content-type', 'text/html; charset=utf-8');
  ctx.body = `<!doctype html>${renderToString(html)}`;
};
