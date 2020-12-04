import './set-public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';

import { App } from './app';

const lifecycles = singleSpaReact({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  React,
  ReactDOM,
  rootComponent: App,
});

export const { bootstrap, mount, unmount } = lifecycles;
