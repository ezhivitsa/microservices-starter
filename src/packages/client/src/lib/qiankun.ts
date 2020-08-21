const qiankumField = '__POWERED_BY_QIANKUN__';

export const isQiankum = (): boolean => {
  return Boolean(window[qiankumField as any]);
};
