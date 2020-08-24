import React from 'react';
import ReactDOM from 'react-dom';

import { Layout } from 'components/layout';

interface Props {
  isContentLoading: boolean;
}

export function renderApp({ isContentLoading }: Props): void {
  const container = document.getElementById('root');
  ReactDOM.render(<Layout isContentLoading={isContentLoading} />, container);
}
