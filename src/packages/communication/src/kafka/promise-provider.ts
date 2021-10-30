import { KafkaCommandTimeoutError, KafkaHandlerError } from './errors';

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

interface CacheValue {
  timeoutId: NodeJS.Timeout;
  resolve: (data: any) => void;
  reject: (err: Error) => void;
}

const TIMEOUT = 5000;

export class PromiseProvider {
  private _cache: Record<string, CacheValue> = {};
  private _cacheResolve: Record<string, any> = {};

  create<D>(id: string): Promise<D> {
    if (this._cacheResolve[id]) {
      return this._cacheResolve[id];
    }

    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        delete this._cache[id];
        reject(new KafkaCommandTimeoutError());
      }, TIMEOUT);

      this._cache[id] = {
        timeoutId,
        resolve,
        reject,
      };
    });
  }

  resolve(id: string, data: any): void {
    if (this._cache[id]) {
      this._cache[id].resolve(data);
    } else {
      this._cacheResolve[id] = data;
    }
  }

  reject(id: string, data: any): void {
    if (this._cache[id]) {
      this._cache[id].reject(new KafkaHandlerError(data));
    }
  }
}
