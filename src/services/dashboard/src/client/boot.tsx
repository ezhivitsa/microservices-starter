import React from 'react';
import ReactDom from 'react-dom';

import { lib } from '@packages/client';

import { App } from './app';

lib.onWindowLoad(() => {
  return ReactDom.render(<App />, window.document.getElementById('root'));
});
