import React, { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { Spinner } from '@packages/ui';

function PageLoading(): ReactElement {
  return <Spinner mode="page" />;
}

export const loadingLifecycles = singleSpaReact({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  React,
  ReactDOM,
  rootComponent: PageLoading,
});
