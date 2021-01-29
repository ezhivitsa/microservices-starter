import { createContext, useContext, useMemo } from 'react';

import { ForgotPasswordStore } from 'stores';

export const ForgotPasswordStoreContext = createContext(new ForgotPasswordStore());
export const ForgotPasswordStoreProvider = ForgotPasswordStoreContext.Provider;

export const useForgotPasswordStore = (): ForgotPasswordStore => useContext(ForgotPasswordStoreContext);
export const useCreateForgotPasswordStore = (): ForgotPasswordStore => useMemo(() => new ForgotPasswordStore(), []);
