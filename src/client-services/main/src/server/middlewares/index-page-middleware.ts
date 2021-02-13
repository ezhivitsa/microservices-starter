import { RouterAppMiddleware, RouterAppContext } from 'koa';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import axios from 'axios';

import { Types, ServiceTypes, ServerConstants, FrontPaths } from '@packages/common';

import { config } from 'lib/config';

import { IndexPage, IndexPageProps } from 'pages/index-page';

const { versionV1, usersPrefix, currentPath } = ServerConstants;

async function getUser(ctx: RouterAppContext): Promise<ServiceTypes.GetCurrentUserResponse | null> {
  const accessToken = ctx.cookies.get(ServerConstants.accessToken);
  const refreshToken = ctx.cookies.get(ServerConstants.refreshToken);

  try {
    const user = await axios.get(`${config.apiGatewayUrl}${versionV1}${usersPrefix}${currentPath}`, {
      responseType: 'json',
      withCredentials: true,
      headers: {
        Cookie: `${ServerConstants.accessToken}=${accessToken};${ServerConstants.refreshToken}=${refreshToken};`,
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

  if (!ctx.url.startsWith(config.frontUpstreams.auth.rule)) {
    const user = await getUser(ctx);

    if (!user) {
      ctx.redirect(FrontPaths.Auth.signinPath({ fullPath: true, returnUrl: ctx.url }));
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
