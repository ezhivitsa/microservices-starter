import React from 'react';
import { render } from 'react-dom';

import { ROOT_ELEMENT_ID } from 'constants/app.constants';

import { Layout } from 'components/layout';

import { register } from './app';

render(<Layout />, document.getElementById(ROOT_ELEMENT_ID));
register();
// import { registerApplication, start } from 'single-spa';

// import { config } from 'lib/config';

// const { dashboard } = config.frontUpstreams;

// registerApplication({
//   name: dashboard.name,
//   app: () => window.System.import(dashboard.name),
//   activeWhen: [dashboard.rule],
// });

// start({
//   urlRerouteOnly: true,
// });
