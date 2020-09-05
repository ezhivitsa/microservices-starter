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
  // errorBoundary(err, info, props) {
  //   // Customize the root error boundary for your microfrontend here.
  //   return null;
  // },
});

export const { bootstrap, mount, unmount } = lifecycles;
