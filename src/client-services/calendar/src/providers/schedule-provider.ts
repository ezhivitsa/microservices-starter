import { createContext, useContext } from 'react';

import { CurrentUserStore } from 'stores';

export const CurrentUserStoreContext = createContext(new CurrentUserStore());
export const CurrentUserStoreProvider = CurrentUserStoreContext.Provider;

export const useCurrentUserStore = (): CurrentUserStore => useContext(CurrentUserStoreContext);
