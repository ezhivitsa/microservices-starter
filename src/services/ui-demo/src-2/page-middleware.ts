import * as path from 'path';
import { Response, NextFunction } from 'express';

import { AssetsPaths } from 'packages/geoadv-types/browser-types';
import { ExtendedRequest } from 'packages/geoadv-types/helpers';

import { config } from 'packages/geoadv-config';
import * as assetsProvider from 'packages/geoadv-server-utils/assets-provider';
import * as optionsProvider from 'packages/geoadv-server-utils/options-provider';
import packageJson from 'packages/geoadv-server-utils/package';

import { getComponentsWithDemo, getComponentMeta } from 'lib/prepare-components';

const { version } = packageJson;
const basename = `${config.get('baseUrl')}/ui`;

const rootDir = path.resolve(__dirname, '../..');

interface ClientConfig {
  version: string;
  baseUrl: string;
  basename: string;
  publicPath: string;
  components: string[];
  query: { [key: string]: number | string };
  component?: {
    name: string;
    code: string;
  };
}

function getAssetsPaths(): AssetsPaths {
  return assetsProvider.getPaths({
    name: 'ui',
    lang: 'ru',
    version,
  });
}

async function getClientConfig(req: ExtendedRequest): Promise<ClientConfig> {
  return {
    version,
    baseUrl: config.get('baseUrl'),
    basename,
    publicPath: assetsProvider.getPublicPath({ version }),
    query: req.query,
    components: getComponentsWithDemo(),
    ...(req.params[0] && { component: getComponentMeta(req.params[0]) }),
  };
}

async function render(req: ExtendedRequest, res: Response): Promise<void> {
  const view = await assetsProvider.require({
    target: 'server/ui',
    lang: 'ru',
  });

  const renderOptions = {
    publicPath: assetsProvider.getPublicPath({ version }),
    assetsPaths: getAssetsPaths(),
    polyfillsUrl: optionsProvider.getPolyfillsUrl(req),
  };

  const { html } = view.render({
    config: await getClientConfig(req),
    options: renderOptions,
    url: path.join(config.get('baseUrl'), req.url),
  });

  res.writeHead(200, optionsProvider.getHeaders(req));
  res.write('<!doctype html>' + html);
  res.end();
}

export const uiPageMiddleware = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  return render(req, res).catch((error) => {
    handlePageError(error, req);
    next(error);
  });
};
