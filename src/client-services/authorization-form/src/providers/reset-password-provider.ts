import { createContext, useContext, useMemo } from 'react';

import { ResetPasswordStore } from 'stores';

export const ResetPasswordStoreContext = createContext(new ResetPasswordStore());
export const ResetPasswordStoreProvider = ResetPasswordStoreContext.Provider;

export const useResetPasswordStore = (): ResetPasswordStore => useContext(ResetPasswordStoreContext);
export const useCreateResetPasswordStore = (): ResetPasswordStore => useMemo(() => new ResetPasswordStore(), []);
