import React, { ReactElement } from 'react';

import { WeatherStoreProvider } from 'providers';
import { WeatherStore } from 'stores';

export function App(): ReactElement {
  return <WeatherStore></WeatherStore>;
}
