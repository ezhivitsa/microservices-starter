import { createContext, useContext } from 'react';

import { SignUpStore } from 'stores';

export const SignUpStoreContext = createContext(new SignUpStore());
export const SignUpStoreProvider = SignUpStoreContext.Provider;

export const useSignUpStore = (): SignUpStore => useContext(SignUpStoreContext);
