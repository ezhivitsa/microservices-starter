import { createContext, useContext, useMemo } from 'react';

import { UsersStore } from 'stores';

export const UsersStoreContext = createContext(new UsersStore());
export const UsersStoreProvider = UsersStoreContext.Provider;

export const useUsersStore = (): UsersStore => useContext(UsersStoreContext);
export const useNewUsersStore = (): UsersStore => useMemo(() => new UsersStore(), []);
