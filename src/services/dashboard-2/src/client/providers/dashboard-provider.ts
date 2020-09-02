import { createContext, useContext } from 'react';

import { DashboardStore } from 'stores';

export const DashboardStoreContext = createContext(new DashboardStore());
export const DashboardStoreProvider = DashboardStoreContext.Provider;

export const useDashboardStore = (): DashboardStore => useContext(DashboardStoreContext);
