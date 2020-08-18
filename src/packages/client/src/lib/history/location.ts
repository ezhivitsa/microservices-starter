import qs from 'qs';

type QuerySearchParams = Record<string, unknown> | string | undefined;

export function mergeParamsToSearch(...params: QuerySearchParams[]): string {
  const mergedParams = mergeParamsToQuery(params);
  return qs.stringify(mergedParams);
}

export function mergeParamsToQuery(params: QuerySearchParams[]): Record<string, unknown> {
  return params.reduce<Record<string, unknown>>((mergedParams, paramsItem) => {
    if (!paramsItem) {
      return mergedParams;
    }

    let queryParams: Record<string, unknown>;
    if (typeof paramsItem === 'string') {
      queryParams = qs.parse(paramsItem, { ignoreQueryPrefix: true });
    } else {
      queryParams = paramsItem;
    }

    return {
      ...mergedParams,
      ...queryParams,
    };
  }, {});
}
