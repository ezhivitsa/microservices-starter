import React from 'react';
import ReactDom from 'react-dom';

import { onWindowLoad } from '@packages/client/lib';

import { App } from './app';

onWindowLoad(() => {
  return ReactDom.hydrate(<App />, window.document.getElementById('root'));
});
