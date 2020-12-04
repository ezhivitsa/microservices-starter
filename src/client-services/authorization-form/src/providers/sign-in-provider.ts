import { createContext, useContext } from 'react';

import { SignInStore } from 'stores';

export const SignInStoreContext = createContext(new SignInStore());
export const SignInStoreProvider = SignInStoreContext.Provider;

export const useSignInStore = (): SignInStore => useContext(SignInStoreContext);
