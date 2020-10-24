import { Context } from './context';
import { Middleware, ComposedMiddleware, Next } from './types';

export function compose(middlewares: Middleware[]): ComposedMiddleware {
  return function (context: Context, next?: Next) {
    // last called middleware #
    let index = -1;

    function dispatch(i: number): Promise<void> {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'));
      }

      index = i;
      let fn = middlewares[i];

      if (i === middlewares.length && next) {
        fn = next;
      }

      if (!fn) {
        return Promise.resolve();
      }

      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return dispatch(0);
  };
}
