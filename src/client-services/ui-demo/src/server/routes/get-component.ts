import { RouterAppMiddleware, RouterAppContext } from 'koa';

import { componentParam } from 'common/constants';

import { getComponentMeta } from 'lib/prepare-components';

export const getComponent: RouterAppMiddleware = (ctx: RouterAppContext): void => {
  const component = ctx.params[componentParam];

  const meta = getComponentMeta(component);
  ctx.body = meta;
};
