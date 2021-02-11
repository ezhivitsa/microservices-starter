import Koa, { Context } from 'koa';
import mount from 'koa-mount';

import { Kafka } from '@packages/communication';

const app = new Koa();

export function initPing(port: number, kafka: Kafka): void {
  app
    .use(
      mount('/ping', async (ctx: Context) => {
        const isHealthy = await kafka.isHealthy();
        if (!isHealthy) {
          ctx.throw(403);
        }

        ctx.body = null;
      }),
    )
    .listen(port);
}
