import { createContext, useContext, useMemo } from 'react';

import { CurrentUserStore } from 'stores';

export const CurrentUserStoreContext = createContext(new CurrentUserStore());
export const CurrentUserStoreProvider = CurrentUserStoreContext.Provider;

export const useCurrentUserStore = (): CurrentUserStore => useContext(CurrentUserStoreContext);
export const useCreateCurrentUserStore = (): CurrentUserStore => useMemo(() => new CurrentUserStore(), []);
