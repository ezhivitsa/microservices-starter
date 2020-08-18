import React, { ReactElement } from 'react';
import { Router } from 'react-router-dom';

import { WeatherStoreProvider } from 'providers';
import { WeatherStore } from 'stores';

export function App(): ReactElement {
  return <Router></Router>;
}
