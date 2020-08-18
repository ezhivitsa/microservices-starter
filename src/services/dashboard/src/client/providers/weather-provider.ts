import { createContext, useContext } from 'react';

import { WeatherStore } from 'stores';

export const WeatherStoreContext = createContext(new WeatherStore());
export const WeatherStoreProvider = WeatherStoreContext.Provider;

export const useWeatherStore = (): WeatherStore => useContext(WeatherStoreContext);
