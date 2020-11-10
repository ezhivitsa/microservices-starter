import React from 'react';
import ReactDom from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { initTexts } from 'packages/geoadv-utils/get-text';
import { onWindowLoad } from 'packages/geoadv-utils/on-window-load';

import { App } from 'services/ui-demo/app';

onWindowLoad(() => {
  const isHistoryApiSupported = 'pushState' in window.history;
  const config = window.__CONFIG__;

  initTexts(config.texts);

  return ReactDom.hydrate(
    <BrowserRouter basename={config.basename} forceRefresh={!isHistoryApiSupported}>
      <App config={config} />
    </BrowserRouter>,
    window.document.getElementById('root'),
  );
});
