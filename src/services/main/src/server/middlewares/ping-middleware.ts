import {AppMiddleware, AppContext} from 'koa';

export const pingMiddleware: AppMiddleware = (ctx: AppContext): void => {
    ctx.status = 203;
};
