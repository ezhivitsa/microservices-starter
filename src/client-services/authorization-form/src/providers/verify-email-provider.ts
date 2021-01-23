import { createContext, useContext, useMemo } from 'react';

import { VerifyEmailStore } from 'stores';

export const VerifyEmailStoreContext = createContext(new VerifyEmailStore());
export const VerifyEmailStoreProvider = VerifyEmailStoreContext.Provider;

export const useVerifyEmailStore = (): VerifyEmailStore => useContext(VerifyEmailStoreContext);
export const useCreateVerifyEmailStore = (): VerifyEmailStore => useMemo(() => new VerifyEmailStore(), []);
