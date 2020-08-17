import React, { ReactElement } from 'react';

import { Layout } from './components/layout';

interface Props {
  isLoading: boolean;
}

export function App({ isLoading }: Props): ReactElement {
  return <Layout isContentLoading={isLoading} />;
}
