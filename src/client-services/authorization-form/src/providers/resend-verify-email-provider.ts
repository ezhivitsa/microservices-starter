import { createContext, useContext, useMemo } from 'react';

import { ResendVerifyEmailStore } from 'stores';

export const ResendVerifyEmailStoreContext = createContext(new ResendVerifyEmailStore());
export const ResendVerifyEmailStoreProvider = ResendVerifyEmailStoreContext.Provider;

export const useResendVerifyEmailStore = (): ResendVerifyEmailStore => useContext(ResendVerifyEmailStoreContext);
export const useCreateResendVerifyEmailStore = (): ResendVerifyEmailStore =>
  useMemo(() => new ResendVerifyEmailStore(), []);
