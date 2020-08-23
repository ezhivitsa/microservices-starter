import React, { ReactElement } from 'react';
import { hot } from 'react-hot-loader/root';

import { Layout } from './components/layout';

interface Props {
  isLoading: boolean;
}

function AppComponent({ isLoading }: Props): ReactElement {
  return <Layout isContentLoading={isLoading} />;
}

export const App = hot(AppComponent);
