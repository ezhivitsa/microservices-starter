import { Middleware, RouterContext } from '@koa/router';

import { componentParam } from 'common/constants';

import { getComponentMeta } from 'lib/prepare-components';

export const getComponent: Middleware = (ctx: RouterContext): void => {
  const component = ctx.params[componentParam];

  const meta = getComponentMeta(component);
  ctx.body = meta;
};
